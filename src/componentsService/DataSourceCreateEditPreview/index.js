import React from 'react'
import { Form, Field, Input, Select, Button, Table, Message } from '@alifd/next'
import InfoContainer from '@/components/InfoContainer'
import AdvanceBtn from '@/components/AdvanceBtn'
import UploadFormItem from '@/components/UploadFormItem'
import reg from '@/utils/formValidation'
import { leaveAndSave, hasStorageAndInit } from 'utils/common'
import { DataSourceAction, BusinessManageAction } from '@/actions'
const { testConnectRQ } = DataSourceAction
const { getBusinessListRQ, getInfoSysListRQ } = BusinessManageAction
const FormItem = Form.Item
export default class DataSourceCreateEditPreview extends React.Component {
	field = new Field(this)
	state = {
		fileList: [],
		newFileList: [],
		initFieldUuid: '',
		connectLoading: false,
		currentPage: 1,
		pageSize: 8,
		infoCurrentPage: 1,
		infoPageSize: 8,
		//所属业务
		businessList: [],
		//所属信息系统
		infoSysList: [],
		//选中的业务的uuid
		businessUuid: '',
	}
	// 初始化赋值fileList
	async componentDidMount () {
		// 获取业务下拉框
		let businessList = await this.getBusinessListFn()
		this.setState({
			businessList,
		})
		// 获取信息系统下拉框

		console.log('我是新增组件的didmount钩子')
		this.setFileListInitData()
		const initData = hasStorageAndInit()
		// 存在当前修改
		if (initData) {
			this.field.setValues(initData)
		} else {
			if (this.props.pageType === 'edit') {
				// 如果没有初始值、并且是编辑时，获取编辑详情
				this.initFieldList(this.props.initFieldUuid)
			}
		}
		// console.log(this.props.pageType)
	}
	getInfoSysListFn = async () => {
		let params = {
			isPage: true,
			page: this.state.infoCurrentPage,
			limit: this.state.infoPageSize,
			businessUuid: this.state.businessUuid,
		}
		let response = await getInfoSysListRQ(params)
		if (response) {
			if (response.code === 10000) {
				return response.result.list
			} else {
				Message.error(response.msg || '信息系统列表获取失败')
			}
		}
	}
	getBusinessListFn = async () => {
		let params = {
			isPage: true,
			page: this.state.currentPage,
			limit: this.state.pageSize,
		}
		let response = await getBusinessListRQ(params)
		if (response) {
			if (response.code === 10000) {
				return response.result.list
			} else {
				Message.error(response.msg || '业务列表获取失败')
			}
		}
		console.log(response)
	}
	// 业务列表选择框-滚动至底部进行数据动态加载
	onScroll = async (e) => {
		const scrollHeight = e.target.scrollHeight // 内容总高度
		const clientHeight = e.target.clientHeight // 窗口高度
		const scrollTop = e.target.scrollTop //滚动高度
		if (scrollTop + clientHeight === scrollHeight) {
			// 到达底部
			const dataSource = this.state.businessList
			// let page = parseInt(this.state.businessList.length / 10)
			this.setState(
				{
					currentPage: this.state.currentPage + 1,
				},
				async () => {
					let otherData = await this.getBusinessListFn()
					if (otherData && otherData.length > 0) {
						this.setState({ businessList: dataSource.concat(otherData) })
					}
				}
			)
		}
	}
	// 信息系统列表选择框-滚动至底部进行数据动态加载
	infoOnScroll = async (e) => {
		const scrollHeight = e.target.scrollHeight // 内容总高度
		const clientHeight = e.target.clientHeight // 窗口高度
		const scrollTop = e.target.scrollTop //滚动高度
		if (scrollTop + clientHeight === scrollHeight) {
			// 到达底部
			const dataSource = this.state.infoSysList
			// TODO:滚动加载有待讨论
			console.log(dataSource)
			// let page = parseInt(this.state.businessList.length / 10)
			this.setState(
				{
					infoCurrentPage: this.state.infoCurrentPage + 1,
				},
				async () => {
					let otherData = await this.getInfoSysListFn()
					if (otherData && otherData.length > 0) {
						this.setState({ infoSysList: dataSource.concat(otherData) })
					}
				}
			)
		}
	}
	selectBusiness = (v) => {
		console.log(v, '455454654564')
		this.field.setValue('businessUuid', v)
		this.setState(
			{
				businessUuid: v,
				infoCurrentPage: 1,
			},
			async () => {
				let infoSysList = await this.getInfoSysListFn()
				this.setState({
					infoSysList,
				})
			}
		)
	}
	componentWillUnmount () {
		// 以当前的地址为存储的唯一key，当前地址应该为pathname+search
		const pathObj = this.props.location
		const storageName = `${pathObj.pathname}${pathObj.search}`
		// 存储你需要存储的状态对象
		const data = this.field.getValues()
		leaveAndSave(storageName, data)

		this.setState = () => {
			return
		}
	}

	// 设置fileList的初始值
	setFileListInitData = () => {
		this.setState({
			fileList: [{ fileName: '文件1' }, { fileName: '文件2' }],
		})
	}

	// 获取待上传新文件列表
	onGetNewFileList = (fileList) => {
		this.setState({ newFileList: fileList })
	}

	// 获取已上传文件调整后的列表
	onGetOldFileList = (fileList) => {
		console.log(fileList)
		this.setState({ fileList: fileList })
	}
	connectTest = () => {
		this.field.validate(
			['host', 'port', 'defaultDatabase', 'username', 'password'],
			(errors, values) => {
				if (!errors) {
					this.setState(
						{
							connectLoading: true,
						},
						async () => {
							values.type = this.props.dataSourceType
							console.log(values)
							let result = await testConnectRQ(values)
							console.log(result)
							if (result) {
								if (result.code === 10000) {
									Message.success(result.result.msg || '连接失败')
									this.setState({
										connectLoading: false,
									})
								} else {
									Message.error(result.msg || '连接失败')
								}
							}
						}
					)
				}
			}
		)
	}
	onSubmit = () => {
		this.field.validate((errors, values) => {
			if (!errors) {
				console.log(values)
			}
		})
	}
	render () {
		const {
			dataSourceType,
			displayAdvance,
			showAdvance,
			onCancel,
			pageType,
			relaDataResource,
		} = this.props
		const { connectLoading, businessList, infoSysList } = this.state
		const init = this.field.init
		return (
			<Form labelAlign="top" field={this.field} style={{ width: '100%' }}>
				<InfoContainer
					title="基本信息"
					id="basicInfo"
					// style={{ display: !this.props.displayAdvance ? 'none' : '' }}
				>
					<FormItem label="数据源名称：" required>
						<Input
							readOnly={pageType === 'preview'}
							maxLength={50}
							hasLimitHint
							placeholder="请输入数据源名称"
							{...init('name', {
								rules: [
									{
										pattern: reg.noSpace,
										message: '数据源名称中不能包含空格',
									},
									{
										required: true,
										message: '数据源名称不能为空',
									},
								],
							})}
						/>
					</FormItem>
					<FormItem label="数据源描述：" required>
						<Input.TextArea
							readOnly={pageType === 'preview'}
							maxLength={200}
							hasLimitHint
							placeholder="请输入数据源描述"
							{...init('memo')}
						/>
					</FormItem>
					<FormItem label="数据源分类：">
						<Select
							readOnly={pageType === 'preview'}
							style={{ width: '50%' }}
							placeholder="请选择数据源分类"
							{...init('relatedInfoSys')}
						/>
					</FormItem>
					<FormItem label="所属业务：" required>
						<Select
							// dataSource={businessList}
							readOnly={pageType === 'preview'}
							style={{ width: '50%' }}
							placeholder="请选择所属业务"
							{...init('businessUuid', {
								rules: [
									{
										required: true,
										message: '所属业务不能为空',
									},
								],
								props: {
									onChange: this.selectBusiness,
								},
							})}
							menuProps={{ onScroll: this.onScroll }} // 下滑至底部进行数据动态加载
							autoHighlightFirstItem={false} // 避免数据动态加载时滚动回第一行
						>
							{businessList && businessList.length > 0
								? businessList.map((item) => {
										return (
											<Select.Option
												label={item.name}
												value={item.uuid}
												key={item.uuid}
											/>
										)
								  })
								: null}
						</Select>
					</FormItem>

					<FormItem label="所属信息系统：" required>
						<Select
							readOnly={pageType === 'preview'}
							style={{ width: '50%' }}
							placeholder="请选择所属信息系统"
							{...init('informationSystemUuid', {
								rules: [
									{
										required: true,
										message: '所属信息系统不能为空',
									},
								],
							})}
							menuProps={{ onScroll: this.infoOnScroll }} // 下滑至底部进行数据动态加载
							autoHighlightFirstItem={false} // 避免数据动态加载时滚动回第一行
						>
							{infoSysList && infoSysList.length > 0
								? infoSysList.map((item) => {
										return (
											<Select.Option
												label={item.name}
												value={item.uuid}
												key={item.uuid}
											/>
										)
								  })
								: null}
						</Select>
					</FormItem>
				</InfoContainer>
				<AdvanceBtn
					displayAdvance={displayAdvance}
					showAdvance={showAdvance}
					id="advanceBtn"
				/>
				{(() => {
					switch (dataSourceType) {
						case 'file':
							return (
								<InfoContainer
									title="文件信息"
									id="connectInfo"
									style={{ display: !this.props.displayAdvance ? 'none' : '' }}
								>
									<FormItem label="关联表单：" required>
										<Select
											readOnly={pageType === 'preview'}
											style={{ width: '50%' }}
											placeholder="请选择关联表单"
											{...init('relatedFrom')}
										/>
									</FormItem>
									<UploadFormItem
										pageType={pageType}
										currentFileList={this.state.fileList}
										newFileList={this.state.newFileList}
										uploadLimit={10}
										onResetList={this.setFileListInitData}
										onGetNewFileList={this.onGetNewFileList}
										onGetOldFileList={this.onGetOldFileList}
									/>
								</InfoContainer>
							)
						default:
							return (
								<InfoContainer
									title={dataSourceType + '数据源连接信息'}
									id="connectInfo"
									style={{ display: !this.props.displayAdvance ? 'none' : '' }}
								>
									<FormItem label="数据源地址：" required>
										<Input
											readOnly={pageType === 'preview'}
											placeholder="请输入数据源地址"
											{...init('host', {
												rules: [
													{
														required: true,
														message: 'IP地址不能为空',
													},
													{
														pattern: reg.address,
														message: '请输入正确的地址,且地址不能为中文',
													},
												],
											})}
										/>
									</FormItem>
									<FormItem label="数据源端口：" required>
										<Input
											readOnly={pageType === 'preview'}
											placeholder="请输入数据源端口"
											{...init('port', {
												rules: [
													{
														required: true,
														message: '端口不能为空',
													},
													{ pattern: reg.port, message: '请输入正确的端口号' },
												],
											})}
										/>
									</FormItem>
									{dataSourceType === 'redis' ? null : (
										<FormItem label="数据库名称：" required>
											<Input
												readOnly={pageType === 'preview'}
												placeholder="请输入数据库名称"
												{...init('defaultDatabase', {
													rules: [
														{
															required: true,
															message: '数据库名称不能为空',
														},
														{
															pattern: reg.regNoChinese,
															message: '数据库名称不能为中文',
														},
													],
												})}
											/>
										</FormItem>
									)}
									{dataSourceType === 'redis' ? null : (
										<FormItem label="用户名：" required>
											<Input
												readOnly={pageType === 'preview'}
												placeholder="请输入用户名"
												{...init('username', {
													rules: [
														{
															required: true,
															message: '用户名不能为空',
														},
														{
															pattern: reg.regNoChinese,
															message: '用户名不能为中文',
														},
													],
												})}
											/>
										</FormItem>
									)}
									<FormItem label="密码：" required>
										<Input
											readOnly={pageType === 'preview'}
											placeholder="请输入密码"
											{...init('password', {
												rules: [
													{
														required: true,
														message: '密码不能为空',
													},
													{
														pattern: reg.regNoChinese,
														message: '密码不能为中文',
													},
												],
											})}
										/>
									</FormItem>
								</InfoContainer>
							)
					}
				})()}

				{pageType === 'preview' ? (
					<InfoContainer
						title="关联数据资源"
						id="connectInfo"
						style={{ display: !this.props.displayAdvance ? 'none' : '' }}
					>
						<Table dataSource={relaDataResource} id="relaDataResource">
							<Table.Column title="数据资源名称" dataIndex="id" />
							<Table.Column title="创建时间" dataIndex="time" />
							<Table.Column title="操作" dataIndex="operation" />
						</Table>
					</InfoContainer>
				) : null}
				{pageType === 'preview' ? null : (
					<div id="operationBtns">
						<Button
							type="primary"
							style={{ marginRight: 10 }}
							onClick={this.connectTest}
							loading={connectLoading}
						>
							测试连接
						</Button>
						<Button
							type="primary"
							style={{ marginRight: 10 }}
							onClick={this.onSubmit}
						>
							确认
						</Button>
						<Button type="secondary" onClick={onCancel}>
							取消
						</Button>
					</div>
				)}
			</Form>
		)
	}
}
