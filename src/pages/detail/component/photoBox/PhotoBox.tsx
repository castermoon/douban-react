import React from "react"
import mixins from "../../../../assets/style/mixins.styl"
import style from "./photoBox.styl"
import {Link} from "react-router-dom"

interface movieItem{
	cover:string;
	id:number;
	name:string;
}

interface PropsType{
	photoBox:movieItem[];
	height?:string;
	width?:string;
}

const PhotoBox:React.FC<PropsType> = (props) => {
	const { photoBox,height,width } = props
	return(
		<ul className={[style.photoBox,mixins.clearfix].join(" ")}>
			{
				photoBox.length > 0 && photoBox.map(item => {
					return <li className={style.photoBoxItem} style={{"width":width}} key={item.id}>
						<div className={style.imgWrapper} style={{"height":height,"width":width}}>
							<Link to={"/detail/"+item.id} ><img src={item.cover} alt="电影封面"/></Link>
						</div>
					</li>
				})
			}
		</ul>
	)
}


PhotoBox.defaultProps = {
	photoBox:[],
	height:'0',
	width:"115px"
}

export default PhotoBox;
