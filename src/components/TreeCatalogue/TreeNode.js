
import * as React from 'react'
import classNames from 'classnames'
import { TreeContext } from './contextTypes'
import { convertNodePropsToEventData } from './treeUtil'
import IconFont from '@/components/IconFont'
import './index.scss'

const ICON_OPEN = 'open'
const ICON_CLOSE = 'close'

const defaultTitle = '暂无'

class InternalTreeNode extends React.Component {

  state = {
  	showOpt: false
  }

  componentDidMount () {
  	// this.syncLoadData(this.props)
  }

  componentDidUpdate () {
  	// this.syncLoadData(this.props)
  }

  // 节点当前状态
  getNodeState = () => {
  	const { expanded } = this.props

  	return expanded ? ICON_OPEN : ICON_CLOSE
  };

  // 是否有子集
  hasChildren = () => {
  	const { eventKey } = this.props
  	const {
  		context: { keyEntities },
  	} = this.props

  	const { children } = keyEntities[eventKey] || {}

  	return !!(children || []).length
  };

  onExpand = e => {
  	const {
  		context: { onNodeExpand, expanded },
		} = this.props
		console.log(expanded)
  	onNodeExpand(e, convertNodePropsToEventData(this.props))
  };

  // 切换器的渲染
  renderSwitcher = () => {
  	const { expanded } = this.props

  	if (this.hasChildren()) {
  		return	<IconFont
  			onClick={this.onExpand}
  			className={classNames('switcher', `treenode-switcher-${expanded ? 'open' : 'close'}`)}
  			type='iconarrow'
  		/>
  	}
  	return <div className='switcher'></div>
  };
  // 选择器的渲染
  renderSelector = () => {
  	const { title, selected, data } = this.props
  	const {
  		context: { titleRender, targetNodeList },
  	} = this.props
  	// console.log('this.props.data====', data)
  	// console.log('targetNodeList====', targetNodeList)
  	const currentNode = targetNodeList.find((item) => {
  		return (item.node ?? {}).title === data.title
		})

  	// 目录title
  	let titleNode
  	if (typeof title === 'function') {
  		titleNode = title(data)
  	} else if (titleRender) {
  		titleNode = titleRender(data)
  	} else {
  		titleNode = title
		}

  	const $title = currentNode ? (
  		<span
  			className={'tree_title'}
  			dangerouslySetInnerHTML={{ __html: titleNode.toString().split(currentNode.node.keyword).join(
  				`<span style="color: #EB7E10">${currentNode.node.keyword}</span>`
  			) }}
  		/>
  	) : (
  		<span className={'tree_title'}>{titleNode}</span>
  	)
  	return (
  		<span
  			ref={this.setSelectHandle}
  			title={typeof title === 'string' ? title : ''}
  			className={classNames(
  				// `${this.getNodeState() || 'normal'}`,
  				'treenode',
  				selected && 'node-selected',
  			)}
  			onMouseEnter={this.onMouseEnter}
  			onMouseLeave={this.onMouseLeave}
  			onClick={this.onSelectorClick}
  		>
				{$title}
  		</span>
  	)
  }
  // 点击选择函数
  onSelectorClick = e => {
  	const {
  		context: { onNodeSelect, selectable },
  	} = this.props

  	if (selectable) { // 允许选择
  		onNodeSelect(e, convertNodePropsToEventData(this.props))
  	}
  }
  // 新增目录
  onCreateNode = (e) => {
  	const {
  		context: { onCreateNodeChild },
  	} = this.props
  	onCreateNodeChild(e, convertNodePropsToEventData(this.props))
  }
  // 编辑目录
  onUpdateNode = (e) => {
  	const {
  		context: { onUpdateNode },
  	} = this.props
  	onUpdateNode(e, convertNodePropsToEventData(this.props))
  }
  // 目录
  onDeleteNode = (e) => {
  	const {
  		context: { onDeleteNode },
  	} = this.props
  	onDeleteNode(e, convertNodePropsToEventData(this.props))
  }
  // 渲染选项功能
  renderOptions = () => {
  	const {
  		level,
  		context: { maxLevel },
  	} = this.props
  	const MAX = maxLevel ?? Infinity

  	return this.state.showOpt ?
  		(
  			<div className='treenode_options_box'>
					{MAX > level ?
						<IconFont
  					onClick={this.onCreateNode}
  					type='iconcatalogue_add'
  					className='treenode_options'
  				/> : null}
  				<IconFont
  					onClick={this.onUpdateNode}
  					type='iconcatalogue_edit'
  					className='treenode_options'
  				/>
  				<IconFont
  					onClick={this.onDeleteNode}
  					type='iconcatalogue_del'
  					className='treenode_options treenode_options_del'
  				/>
  			</div>
  		)	: null
  }
  render () {
  	const {
  		style,
  		context: { optionable }
  	} = this.props

  	return (
  		<div
  			onMouseEnter={
  				() => {
  					this.setState({
  						showOpt: true
  					})
  				}
  			}
  			onMouseLeave={
  				() => {
  					this.setState({
  						showOpt: false
  					})
  				}
  			}
  			className='treenode_item'
  			style={style}
  		>
  			{this.renderSwitcher()}
  			{this.renderSelector()}
  			{optionable ? this.renderOptions() : null}
  		</div>
  	)
  }
}

const ContextTreeNode = props => (
	<TreeContext.Consumer>
		{context => <InternalTreeNode {...props} context={context} />}
	</TreeContext.Consumer>
)

ContextTreeNode.displayName = 'TreeNode'

ContextTreeNode.defaultProps = {
	title: defaultTitle,
}

ContextTreeNode.isTreeNode = 1

export { InternalTreeNode }

export default ContextTreeNode
