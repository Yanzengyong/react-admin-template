import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class DataMapEchart extends React.Component {
	echartsReact = React.createRef()

	state = {
		option: {},

		dataSource: [
			{
				name: '业务名称',
				path: 'business_1',
				value: 20,
				statistics: {
					infoSysCount: 1,
					dataSource: 2,
					totalData: 200,
					totalResource: 100,
				},
				children: [
					{
						name: '信息系统',
						path: 'business_1/infoSys_1_1',
						value: 20,
						statistics: {
							dataSource: 1,
							totalData: 200,
							totalResource: 100,
						},
					},
				],
			},
			{
				name: '党建业务',
				path: 'business_2',
				value: 40,
				statistics: {
					infoSysCount: 4,
					dataSource: 5,
					totalData: 300,
					totalResource: 400,
				},
				children: [
					{
						name: '组织管理信息系统',
						path: 'business_2/infoSys_2_1',
						value: 20,
						statistics: {
							dataSource: 2,
							totalData: 100,
							totalResource: 50,
						},
						children: [
							{
								name: '组织管理系统数据源1',
								path: 'business_2/infoSys_2_1/dataSourcr_2_1_1',
								value: 30,
							},
							{
								name: '组织管理系统数据源2',
								path: 'business_2/infoSys_2_1/dataSourcr_2_1_2',
								value: 20,
							},
						],
					},
					{
						name: '外宣信息系统',
						path: 'business_2/infoSys_2_2',
						value: 20,
						statistics: {
							dataSource: 1,
							totalData: 100,
							totalResource: 50,
						},
					},
					{
						name: '党员管理信息系统',
						path: 'business_2/infoSys_2_3',
						value: 20,
						statistics: {
							dataSource: 1,
							totalData: 100,
							totalResource: 50,
						},
					},
					{
						name: '党组织信息系统',
						path: 'business_2/infoSys_2_4',
						value: 20,
						statistics: {
							dataSource: 1,
							totalData: 100,
							totalResource: 50,
						},
					},
				],
			},
			{
				name: '企业资产业务',
				path: 'business_3',
				value: 60,
				statistics: {
					infoSysCount: 1,
					dataSource: 2,
					totalData: 200,
					totalResource: 100,
				},
				children: [
					{
						name: '企业信息系统',
						path: 'business_3/infoSys_3_1',
						value: 20,
						statistics: {
							dataSource: 2,
							totalData: 200,
							totalResource: 100,
						},
						children: [
							{
								name: '企业数据源1',
								path: 'business_3/infoSys_3_1/dataSourcr3_1_1',
								value: 40,
								statistics: {
									totalData: 200,
									totalResource: 100,
								},
							},
							{
								name: '企业数据源1',
								path: 'business_3/infoSys_3_1/dataSourcr3_1_2',
								value: 20,
								statistics: {
									totalData: 200,
									totalResource: 100,
								},
							},
						],
					},
				],
			},
			{
				name: '财务业务',
				path: 'business_4',
				value: 30,
				statistics: {
					infoSysCount: 2,
					dataSource: 0,
					totalData: 300,
					totalResource: 400,
				},
				children: [
					{
						name: '考勤系统',
						path: 'business_4/infoSys_4_1',
						value: 20,
						statistics: {
							dataSource: 0,
							totalData: 300,
							totalResource: 400,
						},
					},
					{
						name: '财务管理系统',
						path: 'business_4/infoSys_4_2',
						value: 20,
						statistics: {
							dataSource: 0,
							totalData: 300,
							totalResource: 400,
						},
					},
				],
			},
			{
				name: '人力业务',
				path: 'business_5',
				value: 30,
				statistics: {
					totalData: 300,
					totalResource: 400,
				},
				children: [
					{
						name: '合同系统',
						path: 'business_5/infoSys_5_1',
						value: 20,
						statistics: {
							dataSource: 0,
							totalData: 300,
							totalResource: 400,
						},
					},
					{
						name: '薪酬系统',
						path: 'business_5/infoSys_5_2',
						value: 20,
					},
				],
			},
		],
	}

	componentDidMount () {
		this.setState({
			option: this.getOption(this.state.dataSource),
		})
	}

	getLevelOption = () => {
		return [
			{
				itemStyle: {
					borderColor: '#777',
					borderWidth: 0,
					gapWidth: 1,
				},
				upperLabel: {
					show: false,
				},
			},
			{
				itemStyle: {
					borderColor: '#555',
					borderWidth: 5,
					gapWidth: 1,
				},
				emphasis: {
					itemStyle: {
						borderColor: '#ddd',
					},
				},
			},
			{
				colorSaturation: [0.35, 0.5],
				itemStyle: {
					borderWidth: 5,
					gapWidth: 1,
					borderColorSaturation: 0.6,
				},
			},
		]
	}

	getOption = (data) => {
		return {
			tooltip: {
				formatter: function (params) {
					let infoSysCount, totalData, dataSource, totalResource, strArr
					if (params.data.statistics) {
						infoSysCount = params.data.statistics.infoSysCount
							? '信息系统总数：' +
							  params.data.statistics.infoSysCount +
							  ' 个<br>'
							: ''
						dataSource = params.data.statistics.dataSource
							? '数据源总数：' + params.data.statistics.dataSource + ' 个<br>'
							: ''
						totalData = params.data.statistics.totalData
							? '数据总量：' + params.data.statistics.totalData + ' MB<br>'
							: '数据总量：暂无数据<br>'
						totalResource = params.data.statistics.totalResource
							? '数据资源总数：' +
							  params.data.statistics.totalResource +
							  ' 个<br><br>'
							: '数据资源总数：暂无数据<br>'

						strArr = [
							params.data.name + '：',
							infoSysCount + dataSource + totalData + totalResource,
						]
					} else {
						strArr = [params.data.name + '：', '暂无相关数据']
					}
					return strArr.join('<br>')
				},
			},
			series: [
				{
					name: '数据管理系统',
					type: 'treemap',
					visibleMin: 300,
					leafDepth: 1,
					roam: 'move',
					label: {
						show: true,
						position: 'insideTopLeft',
						formatter: function (params) {
							let
								// infoSysCount,
								totalData,
								// dataSource,
								totalResource,
								strArr
							if (params.data.statistics) {
								// infoSysCount = params.data.statistics.infoSysCount
								// 	? '{label|信息系统总数：' +
								// 	  params.data.statistics.infoSysCount +
								// 	  ' 个}\n\n'
								// 	: ''
								// dataSource = params.data.statistics.dataSource
								// 	? '{label|数据源总数：' +
								// 	  params.data.statistics.dataSource +
								// 	  ' 个}\n\n'
								// 	: ''
								totalData = params.data.statistics.totalData
									? '{label|数据总量：' +
									  params.data.statistics.totalData +
									  ' MB}\n\n'
									: '{label|数据总量：暂无数据}\n\n'
								totalResource = params.data.statistics.totalResource
									? '{label|数据资源总数：' +
									  params.data.statistics.totalResource +
									  ' 个}\n\n'
									: '{label|数据资源总数：暂无数据}\n\n'

								strArr = [
									'{name|' + params.data.name + '}',
									'{hr|}',
									// infoSysCount + dataSource + totalData + totalResource
									totalData + totalResource,
								]
							} else {
								strArr = [
									'{name|' + params.data.name + '}',
									'{hr|}',
									'{label|暂无相关数据}',
								]
							}
							return strArr.join('\n')
						},
						rich: {
							name: {
								fontSize: 12,
								color: '#fff',
							},
							label: {
								fontSize: 12,
								color: '#fff',
							},
							margin: {
								width: '100%',
								lineHeight: 10,
							},
							hr: {
								width: '100%',
								borderColor: 'rgba(255,255,255,0.2)',
								borderWidth: 0.5,
								height: 0,
								lineHeight: 10,
							},
						},
					},
					upperLabel: {
						show: true,
						height: 30,
					},
					itemStyle: {
						borderColor: '#fff',
					},
					levels: this.getLevelOption(),
					data: data,
				},
			],
		}
	}

	render () {
		return (
			<ReactEcharts
				option={this.state.option}
				style={{ width: '100%', height: '100%' }}
			/>
		)
	}
}
