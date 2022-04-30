import React, { Fragment } from "react"
import style from "./commonLabel.styl"
import {Link} from "react-router-dom"
const CommonLabel = (props) => {
	return(
		<Fragment>
			{
				typeof props.content === 'object' ?
					<p>
						<span className={style.label}>{ props.label}:</span>
						{
							props.content.map(item => {
								return 	<Link
									className={style.linkName}
									key={item.id}
									to={`/${props.pathName}/${item.id}`}
								>{item.name}
								</Link>
							})
						}
					</p>
					: <p><span className={style.label}>{props.label}:</span>{props.content}</p>
			}
		</Fragment>
	)
}

export default CommonLabel;
