import style from "./commonTitle.styl"
import React from "react"
import {Link} from "react-router-dom"
const CommonTitle = (props) => {
	const {title,content,link} = props
	return(
		<div className={style.commonTitle}>
			{title}· · · · · ·
			{content && <Link to={link}>( {content} )</Link>}
		</div>
	)
}

export default CommonTitle
