import React, { Fragment } from "react"
import style from "./commonLabel.styl"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

const CommonLabel = (props) => {
	const { content,pathName,label } = props
	return(
		<Fragment>
			{
				typeof content === 'object' ?
					<p>
						<span className={style.label}>{ label}:</span>
						{
							content.length > 0 && content.map(item => {
								return 	<Link
									className={style.linkName}
									key={item.id}
									to={`/${pathName}/${item.id}`}
								>{item.name}
								</Link>
							})
						}
					</p>
					: <p><span className={style.label}>{label}:</span>{content}</p>
			}
		</Fragment>
	)
}

//类型检查
CommonLabel.propTypes = {
	content :PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.number,
	]),
	pathName :PropTypes.string,
	label :PropTypes.string
}

CommonLabel.defaultProps = {
	title:"",
	left:"",
	right:""
}

export default CommonLabel;
