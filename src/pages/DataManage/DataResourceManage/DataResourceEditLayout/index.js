import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import DataResourceEdit from '@/componentsService/DataResourceEdit'
export default class DataResourceEditLayout extends React.Component {
  state = {}
  render () {
  	return (
  		<InfoLayout>
  			<DataResourceEdit
  				onCancel={() => {
  					this.props.history.go(-1)
  				}}
  			></DataResourceEdit>
  		</InfoLayout>
  	)
  }
}
