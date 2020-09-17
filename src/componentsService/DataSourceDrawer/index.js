import React, { Component } from 'react'
import { Collapse, Drawer } from '@alifd/next'
import IconFont from '@/components/IconFont'
import './index.scss'
const Panel = Collapse.Panel

export default class dataSourceDrawer extends Component {
  state = {
  	dataSourceDrawerVisible: false,
  	drawerWidth: '',
  	defaultExpandedKeys: ['panelone', 'paneltwo', 'panelthree'],
  }

  onClose = () => {
  	this.setState({
  		dataSourceDrawerVisible: false,
  	})
  }
  componentDidMount () {
  	//动态获取drawer宽度
  	this.setState({
  		drawerWidth: window.innerWidth / 4.5,
  	})
  }
  render () {
  	const { dataSourceDrawerVisible, dataSourceDrawerOnClose } = this.props
  	const { drawerWidth, defaultExpandedKeys } = this.state
  	// 需要新增数据源，直接Iconfont增加一张图，然后放到对应的分类即可
  	const relation = ['mysql', 'hive', 'postgresql']
  	const norelation = ['mongodb', 'elastic', 'redis']
  	const file = ['file']
  	return (
  		<Drawer
  			title="请选择数据源类型"
  			placement="right"
  			visible={dataSourceDrawerVisible}
  			onClose={dataSourceDrawerOnClose}
  			width={drawerWidth}
  		>
  			<Collapse defaultExpandedKeys={defaultExpandedKeys}>
  				<Panel title="关系型数据库" key="panelone">
  					<div className="data_source_drawerpanel">
  						{relation.map((item) => {
  							return (
  								<IconFont
  									type={'icon' + item}
  									size="xxxl"
  									className="icon"
  									key={item}
  									onClick={() => {
  										this.props.history.push(
  											`/dataManage/dataSource/create?type=${item}&title=${item}`
  										)
  									}}
  								/>
  							)
  						})}
  					</div>
  				</Panel>
  				<Panel title="非关系型数据库" className="panelBox" key="paneltwo">
  					<div className="data_source_drawerpanel">
  						{norelation.map((item) => {
  							return (
  								<IconFont
  									type={'icon' + item}
  									size="xxxl"
  									className="icon"
  									key={item}
  									onClick={() => {
  										this.props.history.push(
  											`/dataManage/dataSource/create?type=${item}&title=${item}`
  										)
  									}}
  								/>
  							)
  						})}
  					</div>
  				</Panel>
  				<Panel title="数据文件" className="panelBox" key="panelthree">
  					<div className="data_source_drawerpanel">
  						{file.map((item, index) => {
  							return (
  								<IconFont
  									type={'icon' + item}
  									size="xxl"
  									className="icon"
  									key={index}
  									onClick={() => {
  										this.props.history.push(
  											`/dataManage/dataSource/create?type=${item}&title=${item}`
  										)
  									}}
  								/>
  							)
  						})}
  					</div>
  				</Panel>
  			</Collapse>
  		</Drawer>
  	)
  }
}
