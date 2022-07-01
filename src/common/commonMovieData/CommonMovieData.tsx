import React,{Fragment} from "react"
import { Link } from "react-router-dom"
import style from "./commonMovieData.styl"
import CommonLabel from "../commonLabel/CommonLabel";

interface celebrityType{
	id:number;
	name:string;
}

interface CommentsMovieDataType{
	id:number;
	cover:string;
	type:string;
	country:string;
	timeLen:number;
	spoiler:number;
	time:string;
	name:string;
	director:celebrityType[];
	toStar:celebrityType[];
	language?:string;
}


interface PropsType{
	CommentsMovieData:CommentsMovieDataType
}

const CommonMovieData:React.FC<PropsType> = (props) => {

	const { CommentsMovieData } = props
	return(
		<Fragment>
			<div className={style.backLink}><Link to={"/detail/"+ CommentsMovieData.id}> 去 { CommentsMovieData.name}的页面</Link></div>
			<div className={style.movieDetail}>
				<div className={style.coverWrapper}><img src={CommentsMovieData.cover} alt="电影封面"/></div>
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

	function timeFormatChange(time: string){
		return time.substring(0,10)
	}
}



export default CommonMovieData
