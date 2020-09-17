import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import DataResourceBatchCreate from '@/componentsService/DataResourceBatchCreate'
export default class DataResourceBatchCreateLayout extends React.Component {
  state = {}
  render () {
  	return (
  		<InfoLayout>
  			<DataResourceBatchCreate
  				onCancel={() => {
  					this.props.history.go(-1)
  				}}
  			></DataResourceBatchCreate>
  		</InfoLayout>
  	)
  }
}
