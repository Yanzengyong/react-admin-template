# react + Fusion design后台管理模版

## 前言

> 该模版包含了菜单和路由配置的结合（菜单配置即路由配置）、类似浏览器的Tab页签功能编写、用户登陆路由鉴权；<br /> <br />项目构建是基于create-react-app进行构建的，可通过config-overrides配置；需要注意的是：**项目开发前，务必详细阅读本文档以及[前端开发规范](./specification/index.md)**

### 预览图

![preview](https://raw.githubusercontent.com/Yanzengyong/react-admin-template/master/public/logo.png)


### 预览地址

[预览地址](http://167.179.81.55/admin)


### 项目启动

```js
yarn start

or

npm run start
```

### 项目打包

```js
yarn build

or

npm run build
```


### 关于路由、菜单的设置

> 菜单可以在前端自定义写好，也可以通过后端获取渲染，菜单中需要设置所有页面的路由地址及对应的component(类型为string，即component的字符串名称，但需要在pageConfig中进行配置) <br /> <br /> 路由格式：/平台名称/菜单名称/功能名称 【或】 /平台名称/父级菜单名称/菜单名称/功能名称；


**【备注】设置路由 ‘/’ 重定向请在src/layout/index.js中设置:**

```js
// src/layout/index.js

const DefaultMenu = {
	title: '首页',
	path: '/dataManage/main',
	exact: true,
	component: 'DataManageMain',
}
```

* 菜单统一管理在menus文件夹中

#### 菜单配置的参数说明

| 参数名称    | 参数描述                                                   | 参数类型 | 默认值 |
| ----------- | ---------------------------------------------------------- | -------- | ------ |
| title       | 菜单/平台名称                                              | Sring    | ''     |
| path        | 菜单/平台对应路由                                          | Sring    | ''     |
| defaultPath | 平台的默认的菜单路由（平台首页）                           | Sring    | ''     |
| sideMenu    | 平台的默认的菜单数组对象                                   | Array    | []     |
| exact       | 路由地址是否为精确匹配                                     | Boolean  | false  |
| isHide      | 是否隐藏该路由菜单 <br/> 若需要隐藏，则设置isHide: 'Y'     | String   | -      |
| isSub      	| 是否为submenu <br/> 设置值为true，可以下拉该菜单，此时不需要写component和exact     | Boolean   | -      |
| component   | 该路径下对应的组件名称，没有则不写                         | String   | -      |
| children    | 该路径下的子集，没有则不写                                 | Array    | []     |
| role   |  权限 <br /> 事例：['public', 'admin']                                 | Array    | []     |
| layout  |  该路由是否存在layout                                 | Boolean    | -    |


* src/menus/index.js为大平台的导航配置（即头部的导航栏）

```js
import TaskManage from './taskManage'
import UserManage from './userManage'

const Menu = [
	{
		title: '任务管理平台',
		path: '/taskManage',
		defaultPath: '/taskManage/main',
		sideMenu: TaskManage
	},
	{
		title: '英雄管理平台',
		path: '/userManage',
		defaultPath: '/userManage/userInfo',
		sideMenu: UserManage
	},
]

export default Menu
```

* src/menus/Xxx.js为各个平台的菜单配置（即左侧的菜单），注意首字母需要大写； 

```js

export default [
	{
		title: '英雄管理',
		path: '/userManage/userInfo',
		exact: true,
		component: 'UserInfoManage',
		layout: true,
		role: ['public', 'admin'],
		children: [
			{
				title: '查看英雄信息',
				path: '/userManage/userInfo/preview',
				exact: true,
				component: 'UserInfoCreateEditPreview',
				layout: true,
				role: ['public', 'admin'],
				isHide: 'Y'
			}
		]
	}
]

```

* 所有地址对应的component需要在pagesConfig中引入；

* src/pageConfig/index.js为所有平台component的集合； 

```js

import UserManage from './userManage'

export default {
	...UserManage
}

```

* src/pageConfig/Xxx.js为xxx平台component的引入； 

```js
import AsyncComponent from '@/utils/asyncComponent'

const UserInfoManage = AsyncComponent(() => import('@/pages/UserManage/UserInfoManage'))
const UserInfoCreateEditPreview= AsyncComponent(() => import('@/pages/UserManage/UserInfoManage/UserInfoCreateEditPreview'))

export default {
	UserInfoManage, // 英雄信息管理
	UserInfoCreateEditPreview, // 英雄信息新增、编辑、查看
}


```

* 菜单配置文件如果存在子集菜单的情况（如：【任务信息接入】展开后，包含了【任务管理】选项），父级菜单（【任务信息接入】）的path设置为```/平台名称/dataSource```【配置时必须加上isSub: true】，子集菜单（【任务管理】）的path设置为```/平台名称/dataSource/source```

### 关于Tab栏

* 【手动关闭Tab】tab栏支持手动方法删除tab，应用场景为编辑新增等页面在保存、取消时候返回并删除该tab
```js
import { Tab } from '@/reduxActions'

onConfirm = async () => {
	const { pathname, search } = this.props.location

	this.props.history.replace('/taskManage/dataSource/source')

	// 注意设置tab的方法需要放在路由跳转的后面
	await this.props.setDeleteTabPath([`${pathname}${search}`])

	this.props.closeItemTab(`${pathname}${search}`)
}

// 该方法基于store，所以需要connect并且引入reduxActions
```

* 【数据存储】tab栏支持存储切换离开时候的特定属性，无需考虑何时清除，清除功能已集成在方法中（会在该tab被关闭时清除）

```js
import { leaveAndSave, hasStorageAndInit } from 'utils/common'


componentDidMount () {

	const initData = hasStorageAndInit()
	// 存在当前修改
	if (initData) {
		this.field.setValues(initData)
	} else {
		if (this.props.pageType === 'edit') {
			// 如果没有初始值、并且是编辑时，获取编辑详情
			this.initFieldList(this.props.initFieldUuid)
		}
	}

}

componentWillUnmount () {

	// 以当前的地址为存储的唯一key，当前地址应该为pathname+search
	const pathObj = this.props.location
	const storageName = `${pathObj.pathname}${pathObj.search}`
	// 存储你需要存储的状态对象
	const data = this.field.getValues()
	leaveAndSave(storageName, data)

	this.setState = () => {
		return
	}
}
```

### 关于包含生命周期的组件
* 强制要求在组件卸载的生命周期中为setState置空，即清除网络状态

```js
componentWillUnmount () {
  this.setState = () => {
    return
  }
}
```

### 关于api地址设置
* 建立index.js文件，存储设置基础路径（BaseUrl）等通用地址；
* 在api文件夹下以功能（菜单）为单位新建文件；
* index.js下定义的常量约定全部大写，“_”区分间隔
* 统一文件名称首字母大写
* 首行添加yapi地址，目的方便查看请求参数和返回结果


### 关于接口的请求
* 在actions文件夹下以功能（菜单）为单位新建文件，与api文件统一；
* BaseUrl统一引用api文件夹下的index.js内容；
* 提示都在屏幕上方显示；
* 提示不加遮罩层，不加关闭按钮，显示时长用默认（3s）无需设置；
*  统一文件名称首字母大写；

请求例子：
```js

import api from '@/api/test' // 引用baseurl地址
import request from '@/services' // 引用请求
import { Message } from '@alifd/next' // 引用提示组件

async getDispatchListRQ (params) {
	try {
		const result = await request.get(api.getDispatchList, params)
		return result
	} catch (error) {
	   if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			Message.error('请求超时，请检查网络')
		} else {
			Message.error('服务器未知异常，请联系管理员')
		}
	}
}

// 调用时
getInfo = async () => {
  const response = await getDispatchListRQ({
    uuid: this.state.uuid
  })
  if (response) { // 注意：此处一定要先做response的判断，不能写在一行，目的是为code不等于1000后的else做提示语的保证
    if (response.code === 10000) {
    // 当code为成功的时候
    } else {
      // 否则提示后端返回的提示语
      Message.error(response.msg || 'xx失败！')
    }
  }
}

```

