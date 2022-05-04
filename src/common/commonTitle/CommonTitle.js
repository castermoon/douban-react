import style from "./commonTitle.styl"
import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

const CommonTitle = (props) => {
	const {title,content,link} = props
	return(
		<div className={style.commonTitle}>
			{title}· · · · · ·
			{content && <Link to={link}>( {content} )</Link>}
		</div>
	)
}

//类型检查
CommonTitle.propTypes = {
	title :PropTypes.string,
	content :PropTypes.string,
	link :PropTypes.string
}

CommonTitle.defaultProps = {
	title :"",
	content :"",
	link :""
}


export default CommonTitle
