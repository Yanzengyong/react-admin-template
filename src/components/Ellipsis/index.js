/*
 * @Author: Zhangyao
 * @Date: 2020-08-04 10:55:23
 * @LastEditors: Zhangyao
 * @LastEditTime: 2020-08-26 12:09:28
 */
/**
 * 多行文字显示组件，使用方法如下：一定要加一个盒子ellipsisbox哦，不然位置会不对
 * eg:
 *    <Ellipsis alignCenter text={item.description}></Ellipsis>
 * 说明：
 * alignCenter  文字是否居中 bool
 * style  行内样式 object
 * text 文字内容 string
 */
import React from 'react'
import { Balloon } from '@alifd/next'
import './index.scss'
const Tooltip = Balloon.Tooltip
const ellipsis = ({ text, style, alignCenter }) => {
	return (
		<Tooltip
			closable={false}
			type="normal"
			trigger={<div style={alignCenter ? { textAlign: 'left', ...style } : style} className="ellipsistext"> {text}</div>}
			align="b"
		>
			{text}
		</Tooltip>
	)
}
export default ellipsis
