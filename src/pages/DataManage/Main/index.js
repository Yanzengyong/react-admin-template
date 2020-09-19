/*
 * @Author: Zhangyao
 * @Date: 2020-08-13 09:11:24
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-18 17:36:57
 */
import React from 'react'
import IconFont from '@/components/IconFont'
import DataMapEchart from './DataMapEchart'
import DataSourceDrawer from '@/componentsService/DataSourceDrawer'
import './index.scss'
import { findSpecRouteItem } from '@/utils/menuForRoute'


class DataManageMain extends React.Component {
	state = {
		dataSourceDrawerVisible: false,
	}

	// 快速访问
	onFastCreat = (type) => {
		const fastCreatObj = {
			business: findSpecRouteItem('新建业务'),
			InfoSys: findSpecRouteItem('新建信息系统'),
			dataSource: this.setState({
				dataSourceDrawerVisible: true,
			}),
			dataResource: findSpecRouteItem('新增数据资源'),
		}
		if (type !== 'dataSource') {
			this.props.history.push(fastCreatObj[type].path)
		}
	}

	// 关闭数据源抽屉
	dataSourceDrawerOnClose = () => {
		this.setState({
			dataSourceDrawerVisible: false,
		})
	}

	render () {
		const { dataSourceDrawerVisible } = this.state

		return (
			<div className="dataManage_main_page">
				<div className="dataManage_main_content" style={{ height: '30%' }}>
					<div className="dataManage_main_content_title">快速访问</div>
					<div className="fast_visit_btn_group">
						<div
							className="fast_visit_btn"
							onClick={() => this.onFastCreat('business')}
						>
							新建业务
						</div>
						<div className="next_step_icon_style">
							<IconFont type="iconnextStep" />
						</div>
						<div
							className="fast_visit_btn"
							onClick={() => this.onFastCreat('InfoSys')}
						>
							新建信息系统
						</div>
						<div className="next_step_icon_style">
							<IconFont type="iconnextStep" />
						</div>
						<div
							className="fast_visit_btn"
							onClick={() => this.onFastCreat('dataSource')}
						>
							新建数据源
						</div>
						<DataSourceDrawer
							dataSourceDrawerVisible={dataSourceDrawerVisible}
							dataSourceDrawerOnClose={this.dataSourceDrawerOnClose}
							history={this.props.history}
						></DataSourceDrawer>
						<div className="next_step_icon_style">
							<IconFont type="iconnextStep" />
						</div>
						<div
							className="fast_visit_btn"
							onClick={() => this.onFastCreat('dataResource')}
						>
							新建数据资源
						</div>
					</div>
				</div>
				<div className="dataManage_main_content" style={{ height: '68%' }}>
					<div className="dataManage_main_content_title">数据地图</div>
					<p>
						信息系统数量：21个 数据源数量：67个 数据资源数量：235个
						数据资源数据量：234546235条
					</p>
					<div className="data_map_echart">
						<DataMapEchart />
					</div>
				</div>
			</div>
		)
	}
}

export default DataManageMain
