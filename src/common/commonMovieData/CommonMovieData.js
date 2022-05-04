import React,{Fragment} from "react"
import { Link,useParams } from "react-router-dom"
import style from "./commonMovieData.styl"
import CommonLabel from "../commonLabel/CommonLabel";
import PropTypes from "prop-types"

const CommonMovieData = (props) => {
	const params = useParams()
	const { movie_id } = params

	const { CommentsMovieData } = props
	return(
		<Fragment>
			<div className={style.backLink}><Link to={"/detail/"+ movie_id}> 去 { CommentsMovieData.name}的页面</Link></div>
			<div className={style.movieDetail}>
				<div className={style.coverWrapper}><img src={CommentsMovieData.cover}/></div>
				<CommonLabel label="导演" content={CommentsMovieData.director} pathName="celebrity"/>
				<CommonLabel label="主演" content={CommentsMovieData.toStar} pathName="celebrity"/>
				<CommonLabel label="类型" content={CommentsMovieData.type}/>
				<CommonLabel label="制片国家/地区" content={CommentsMovieData.country}/>
				<CommonLabel label="语言" content={CommentsMovieData.language}/>
				{ CommentsMovieData.time && <CommonLabel label="上映时间" content={timeFormatChange(CommentsMovieData.time)}/>}
				<CommonLabel label="片长" content={CommentsMovieData.timeLen}/>
			</div>
		</Fragment>
	)

	function timeFormatChange(time){
		return time.substring(0,10)
	}
}

//类型检查
CommonLabel.propTypes = {
	CommentsMovieData :PropTypes.object
}

CommonLabel.defaultProps = {
	CommentsMovieData:{}
}

export default CommonMovieData
