import React from "react"
import style from "./basebody.styl"

interface PropsType{
	title?:string;
	left?:React.ReactElement;
	right?:React.ReactElement;
}

const BaseBody:React.FC<PropsType> = (props) => {
	const { title,left,right } = props
	return(
		<div className={style.baseBody}>
			{
				title && <h1 className={style.baseBodyTitle}>
					{title}
				</h1>
			}

			<div className={style.baseBodyLeft}>
				{left}
			</div>
			<div className={style.baseBodyRight}>
				{right}
			</div>
		</div>
	)
}


BaseBody.defaultProps = {
	left:<div/>,
	right:<div/>
}

export default BaseBody;
