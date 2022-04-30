import React from "react"
import style from "./basebody.styl"

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
export default BaseBody;
