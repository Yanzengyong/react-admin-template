/*
 * @Author: Zhangyao
 * @Date: 2020-08-13 09:11:24
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 15:24:53
 */
import React from 'react'
import DataMapEchart from './DataMapEchart'
import './index.scss'


class DataManageMain extends React.Component {
	state = {
		dataSourceDrawerVisible: false,
	}

	render () {
		const { dataSourceDrawerVisible } = this.state

		return (
			<div className="dataManage_main_page">
				<div className="dataManage_main_content" style={{ height: '100%' }}>
					<div className="dataManage_main_content_title">任务地图</div>
					<div className="data_map_echart">
						<DataMapEchart />
					</div>
				</div>
			</div>
		)
	}
}

export default DataManageMain
