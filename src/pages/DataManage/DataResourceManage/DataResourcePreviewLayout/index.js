import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import DataResourcePreview from '@/componentsService/DataResourcePreview'
export default class DataResourcePreviewLayout extends React.Component {
  state = {}
  // 点击高级按钮，高级部分切换隐藏/显示模式
  showAdvance = () => {
  	this.setState({
  		displayAdvance: !this.state.displayAdvance,
  	})
  }
  componentWillUnmount () {
  	this.setState = () => {
  		return
  	}
  }
  render () {
  	const navInfo = [
  		{ label: '基本信息', value: 'basicInfo' },
  		{ label: '高级', value: 'advanceBtn' },
  		{ label: '样例数据', value: 'sampleData' },
  		{ label: '血缘关系', value: 'bloodKinship' },
  		{ label: '数据量趋势', value: 'dataSize' },
  		{ label: '数据采集概况', value: 'dataCollect' },
  		{ label: '数据模型', value: 'dataModel' },
  		{ label: '数据质量', value: 'dataQuality' },
  	]
  	const advanceBtnId = 'advanceBtn'
  	const advanceAffectIds = [
  		'sampleData',
  		'bloodKinship',
  		'dataSize',
  		'dataCollect',
  		'dataModel',
  		'dataQuality',
  	]
  	return (
  		<InfoLayout
  			hasNavBar
  			navInfo={navInfo}
  			advanceBtnId={advanceBtnId}
  			advanceAffectIds={advanceAffectIds}
  			showAdvance={this.showAdvance}
  			displayAdvance={this.state.displayAdvance}
  		>
  			<DataResourcePreview
  				showAdvance={this.showAdvance}
  				displayAdvance={this.state.displayAdvance}
  				onCancel={() => {
  					this.props.history.go(-1)
  				}}
  			/>
  		</InfoLayout>
  	)
  }
}
