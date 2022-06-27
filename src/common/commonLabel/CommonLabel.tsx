import React, { Fragment } from "react"
import style from "./commonLabel.styl"
import {Link} from "react-router-dom"


interface celebrityType{
	id:number;
	name:string;
}

interface PropsType{
	content?:string | number | celebrityType[];
	pathName?:string;
	label:string;
}

const CommonLabel:React.FC<PropsType> = (props) => {
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

CommonLabel.defaultProps = {
	content:""
}



export default CommonLabel;
