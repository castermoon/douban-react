import React, { Component,Fragment } from "react"
import mixins from "../../../../assets/style/mixins.styl"
import style from "./photoBox.styl"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

const PhotoBox = (props) => {
	const { photoBox,height,width } = props
	return(
		<ul className={[style.photoBox,mixins.clearfix].join(" ")}>
			{
				photoBox.length > 0 && photoBox.map(item => {
					return <li className={style.photoBoxItem} style={{"width":width}} key={item.id}>
						<div className={style.imgWrapper} style={{"height":height,"width":width}}>
							<Link to={"/detail/"+item.id} ><img src={item.cover}/></Link>
						</div>
					</li>
				})
			}
		</ul>
	)
}

//类型检查
PhotoBox.propTypes = {
	photoBox:PropTypes.array,
	height:PropTypes.string,
	width:PropTypes.string
}

PhotoBox.defaultProps = {
	photoBox:[],
	height:'0',
	width:"115px"
}

export default PhotoBox;
