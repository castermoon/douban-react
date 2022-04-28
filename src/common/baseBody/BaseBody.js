import React, { Component } from "react"
import style from "./basebody.styl"
class BaseBody extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className={style.baseBody}>
				{
					this.props.title && <h1 className={style.baseBodyTitle}>
						{this.props.title}
					</h1>
				}

				<div className={style.baseBodyLeft}>
					{this.props.left}
				</div>
				<div className={style.baseBodyRight}>
					{this.props.right}
				</div>
			</div>
		)
	}
}

export default BaseBody;
