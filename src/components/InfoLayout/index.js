import React from 'react'
import InfoHead from '@/components/InfoHead'
import PropTypes from 'prop-types' // 类型检查
import './index.scss'

export default class InfoLayout extends React.Component {
  state = {

  }

  // 滚动页面
  onClickNavItem = (sectionId) => {
  	if (document.getElementById(sectionId)) {
  		document.getElementById(sectionId).scrollIntoView({ behavior:'smooth' }) // 内容content滚动至相应ID位置
  	}
  	if (sectionId === this.props.advanceBtnId) {
  		this.props.showAdvance()
  	}
  }

  render () {
  	const { hasNavBar, navInfo, displayAdvance, advanceAffectIds, advanceBtnId, operationBtnId, pageType } = this.props

  	return (
  		<div className="info_container">
  			<InfoHead />
  			<div className="info_content">
  				<div className="info_form" style={{ width: !hasNavBar ? '100%' : '', paddingRight: !hasNavBar ? '30%' : '' }}>
  					{this.props.children}
  				</div>
  				<div className="info_nav" style={{ display: !hasNavBar ? 'none' : '' }}>
  					{
  						navInfo.length > 0 ? navInfo.map(item => (
  							<div
  								key={item.value}
  								onClick={()=> this.onClickNavItem(item.value)}
  								className="info_nav_item"
  								style={{ display: (!displayAdvance && advanceAffectIds.filter(id => id === item.value).length > 0) || (item.value === operationBtnId && pageType === 'preview') ? 'none': '' }}
  							>
  								{item.value === advanceBtnId ? (
  									<span style={{ marginRight: 5, color: '#5584FF' }}>{displayAdvance ? '-': '+'}</span>
  								) : null}
  							  <span style={{ color: item.value === advanceBtnId ? '#5584FF': '' }}>{item.label}</span>
  							</div>
  						)) : null
  					}
  				</div>
  			</div>
  		</div>
  	)
  }
}

// props默认值指定
InfoLayout.defaultProps = {
	hasNavBar: false,
	navInfo: [],
	displayAdvance: false,
	advanceBtnId: 'advanceBtn',
	advanceAffectIds: [],
	operationBtnId: 'operationBtns',
	pageType: '',
}

InfoLayout.propTypes = {
	hasNavBar: PropTypes.bool, // 是否显示快速导航
	navInfo: PropTypes.array, // 导航栏内容（仅限noNavBar={false})时有效
	displayAdvance: PropTypes.bool, // 高级按钮T/F
	advanceBtnId: PropTypes.string, // 高级按钮DOM的id
	showAdvance: PropTypes.func, // 高级按钮点击function
	advanceAffectIds: PropTypes.array, // 受到高级按钮影响的nav的id数组
	operationBtnId: PropTypes.string, // 操作按钮DOM的id
	pageType: PropTypes.string, // 当前页面类型
}
