import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import DataResourceCreate from '@/componentsService/DataResourceCreate'
class DataResourceCreateLayout extends React.Component {
  state = {}
  render () {
  	const { pageType } = this.state
  	const navInfo = [
  		{ label: '选择数据源', value: 'chooseDataSource' },
  		{ label: '选择数据对象', value: 'chooseDataObject' },
  		{ label: '配置', value: 'config' },
  		{ label: '操作', value: 'operationBtns' },
  	]
  	return (
  		<InfoLayout
  			hasNavBar
  			navInfo={navInfo}
  			displayAdvance={this.state.displayAdvance}
  			showAdvance={this.showAdvance}
  			pageType={pageType}
  		>
  			<DataResourceCreate
  				onCancel={() => {
  					this.props.history.go(-1)
  				}}
  			/>
  		</InfoLayout>
  	)
  }
}
export default DataResourceCreateLayout
