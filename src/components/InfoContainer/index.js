import React from 'react'
import './index.scss'

export default class InfoContainer extends React.Component {
	render () {
		const { title, id, style } = this.props

		return (
			<div className="info_container_border" id={id} style={style ? style : {}}>
				<div className="info_container_title">{title}</div>
				<div className="info_container_content">
					{this.props.children}
				</div>
			</div>
		)
	}
}
