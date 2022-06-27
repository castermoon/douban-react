import style from "./commonTitle.styl"
import React from "react"
import {Link} from "react-router-dom"

interface PropsType{
	title:string;
	content?:string;
	link?:string;
}

const CommonTitle:React.FC<PropsType> = (props) => {
	const {title,content,link} = props
	return(
		<div className={style.commonTitle}>
			{title}· · · · · ·
			{/* @ts-ignore */}
			{content && <Link to={link}>( {content} )</Link>}
		</div>
	)
}



CommonTitle.defaultProps = {
	title :"",
	content :"",
	link :""
}


export default CommonTitle
