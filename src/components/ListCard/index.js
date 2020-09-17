/*
 * @Author: Zhangyao
 * @Date: 2020-08-04 10:55:23
 * @LastEditors: Zhangyao
 * @LastEditTime: 2020-08-27 15:33:07
 */
import React from 'react'
import { Checkbox, Loading, Balloon } from '@alifd/next'
import PropTypes from 'prop-types'
import Ellipsis from '@/components/Ellipsis'
import IconFont from '@/components/IconFont'
import { Tag } from '@alifd/next'
import moment from 'moment'
import './index.scss'
// const Tooltip = Balloon.Tooltip
class ListCard extends React.Component {
	state = {
		isShow: [],
		chooseIndex: [],
	}
	// chooseStar = (value) => {
	// 	let savechooseIndex = this.state.chooseIndex
	// 	let saveisShow = this.state.isShow
	// 	let findResult = this.state.chooseIndex.findIndex((item) => {
	// 		return item === value
	// 	})
	// 	console.log(findResult)
	// 	if (findResult === -1) {
	// 		this.setState(
	// 			{
	// 				chooseIndex: [value, ...savechooseIndex],
	// 				isShow: [value, ...saveisShow],
	// 			},
	// 			() => {
	// 				console.log(this.state.chooseIndex)
	// 				console.log(this.state.isShow)
	// 			}
	// 		)
	// 	} else {
	// 		savechooseIndex.splice(findResult, 1)
	// 		saveisShow.splice(findResult, 1)
	// 		this.setState({
	// 			chooseIndex: savechooseIndex,
	// 			isShow: saveisShow,
	// 		})
	// 	}
	// }

	render () {
		const {
			dataSource,
			clos,
			operation,
			pictureIndex,
			primaryKey,
			rowSelection,
			selectedRowKeys,
			loading,
			starDataIndex,
			starOnclick,
			bottomClos,
			tagDataIndex,
			tagRule,
			titleBalloonDataIndex,
			titleBalloonText,
			titleBalloonChange,
			titleBalloonTriggerType,
			titleBalloonAlign,
		} = this.props
		return dataSource.length > 0 ? (
			<Loading tip="加载中..." style={{ display: 'block' }} visible={loading}>
				<Checkbox.Group onChange={rowSelection} value={selectedRowKeys}>
					{dataSource.map((item, index) => {
						return (
							<div className="list_card_item" key={index}>
								<div className="list_card_top">
									<div className="list_card_title_box">
										{rowSelection ? (
											<Checkbox
												className="list_card_title_checkbox"
												value={primaryKey ? item[primaryKey] : index}
											></Checkbox>
										) : null}
										{tagDataIndex && tagRule ? (
											<Tag
												type="normal"
												color={
													tagRule[
														tagRule.findIndex((tagRuleItem) => {
															return item[tagDataIndex] == tagRuleItem.value
														})
													].color
												}
												className="list_card_title_tag"
												size="small"
											>
												{
													tagRule[
														tagRule.findIndex((tagRuleItem) => {
															return item[tagDataIndex] == tagRuleItem.value
														})
													].label
												}
											</Tag>
										) : null}

										<div className="list_card_title">
											{titleBalloonDataIndex || titleBalloonText ? (
												<Balloon
													closable={false}
													type="normal"
													trigger={item[clos[0].dataIndex]}
													align={titleBalloonAlign}
													triggerType={titleBalloonTriggerType}
													onVisibleChange={titleBalloonChange}
												>
													{titleBalloonDataIndex
														? item[titleBalloonDataIndex]
														: titleBalloonText}
												</Balloon>
											) : (
												item[clos[0].dataIndex]
											)}
										</div>
									</div>
									{starDataIndex && starOnclick ? (
										<div className="operation_icon">
											<IconFont
												type="iconstar"
												size="medium"
												className={
													item[starDataIndex] ? 'choose_start' : 'default_star'
												}
												onClick={() => {
													starOnclick(item[primaryKey], item)
												}}
												// className={isShow.map((isShowItem) => {
												// 	return isShowItem ===
												// 		JSON.stringify(item) + '-' + `${index}`
												// 		? 'choose_start'
												// 		: ''
												// })}
												// onClick={() => {
												// 	this.chooseStar(JSON.stringify(item) + '-' + `${index}`)
												// }}
											/>
										</div>
									) : null}
								</div>
								<div className="list_card_main">
									<div className="listcard_left">
										{pictureIndex ? (
											<IconFont
												type={'icon' + item[pictureIndex].toLowerCase()}
												size="xxxl"
												className="list_card_img "
											/>
										) : null}

										<div className="content_box">
											<div className="content">
												<Ellipsis
													// alignCenter
													text={item[clos[1].dataIndex]}
												></Ellipsis>
											</div>
											<div className="content_group">
												{bottomClos ? (
													bottomClos.map((bottomClos, index) => {
														return (
															<div
																className="content_date"
																key={`${item.title}-${index}`}
															>
																{bottomClos.title}：{item[bottomClos.dataIndex]}
															</div>
														)
													})
												) : (
													<div className="content_date">
														{clos[2].title}：
														{moment(item[clos[2].dataIndex]).format(
															'YYYY-MM-DD HH:mm:ss'
														)}
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="listcard_operation">{operation(item)}</div>
								</div>
							</div>
						)
					})}
				</Checkbox.Group>
			</Loading>
		) : (
			<div className="nodata_page">
				<IconFont type="iconnodata" className="nodata_img" />
			</div>
		)
	}
}
export default ListCard
ListCard.defaultProps = {
	dataSource: [],
	loading: false,
}
ListCard.propTypes = {
	dataSource: PropTypes.array, //数据源
	clos: PropTypes.array, //展示字段，类似于table的标题，用于字段匹配
	operation: PropTypes.func, //操作区
	pictureIndex: PropTypes.string, //图片参数字段,需要使用就传，不需要就不传
	primaryKey: PropTypes.string, //每一行的唯一标识，不传默认为index
	rowSelection: PropTypes.func, //卡片选中事件
	selectedRowKeys: PropTypes.array, //多选选中的value数组
	loading: PropTypes.bool, //loading状态
	starDataIndex: PropTypes.string, //星标，传入字段，和starOnclick配合使用且必传
	starOnclick: PropTypes.func, //星标点击事件，默认传递primaryKey，item ，与starDataIndex配合使用且必传
	tagDataIndex: PropTypes.string, //标题tag，传入字段，和tagRule配合使用且必传
	tagRule: PropTypes.array, //标题tag的规则示例，和tagDataIndex配合使用且必传
	titleBalloonTriggerType: PropTypes.string, //标题气泡提示触发行为
	titleBalloonAlign: PropTypes.string, //标题气泡弹出层位置,'t'(上),'r'(右),'b'(下),'l'(左)
	titleBalloonDataIndex: PropTypes.string, //标题气泡提示，传入字段
	titleBalloonText: PropTypes.string, //自定义标题气泡提示内容,与titleBalloonChange结合使用且必传
	titleBalloonChange: PropTypes.func, //气泡提示打开关闭事件，与titleBalloonText结合使用且必传
}
