import React, { Component,Fragment } from "react"
import style from "./commonLabel.styl"
import {Link} from "react-router-dom"

class CommonLabel extends Component{
	render() {
		return(
			<Fragment>
				{
					typeof this.props.content === 'object' ?
						<p>
							<span className={style.label}>{ this.props.label}:</span>
							{
								this.props.content.map(item => {
									return 	<Link
										className={style.linkName}
										key={item.id}
										to={`/${this.props.pathName}/${item.id}`}
									>{item.name}
									</Link>
								})
							}
						</p>
						: <p><span className={style.label}>{this.props.label}:</span>{this.props.content}</p>
				}
			</Fragment>
		)
	}
}

export default CommonLabel;
