import React from 'react'
import ReactEcharts from 'echarts-for-react'
// TODO:绑接口后传入数据渲染，现在用假数据
export default function DataSize ({ data }) {
	// if (!data || Object.keys(data).length === 0) {
	// 	return null
	// }
	const Option = {
	  xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line'
		}]
	}
	return (
		<ReactEcharts
			option={Option}
			style={{ width: '100%', height: '400px' }}
		></ReactEcharts>
	)
}
