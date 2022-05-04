import React from "react"
import style from "./basebody.styl"
import PropTypes from "prop-types"

const BaseBody = (props) => {
	return(
		<div className={style.baseBody}>
			{
				props.title && <h1 className={style.baseBodyTitle}>
					{props.title}
				</h1>
			}

			<div className={style.baseBodyLeft}>
				{props.left}
			</div>
			<div className={style.baseBodyRight}>
				{props.right}
			</div>
		</div>
	)
}

//类型检查
BaseBody.propTypes = {
	title:PropTypes.string,
	left:PropTypes.element,
	right:PropTypes.element
}

BaseBody.defaultProps = {
	title:"",
	left:"",
	right:<span/>
}

export default BaseBody;
