import React, { useState,useEffect,Fragment } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import CommonFooter from "../../common/commonFooter/CommonFooter";
import BaseBody from "../../common/baseBody/BaseBody";
import axios from "axios"
import style from "./detail.styl"
import CommonLabel from "../../common/commonLabel/CommonLabel";
import RatingPercent from "../../common/ratingPercent/RatingPercent";
import Star from "../../common/star/Star";
import {Link,useParams} from "react-router-dom"
import MovieCommentWindow from "../../common/movieCommentWindow/MovieCommentWindow";
import CommonTitle from "../../common/commonTitle/CommonTitle";
import PhotoBox from "./component/photoBox/PhotoBox";


const Detail = () => {
	const [data, setData] = useState({
		maybeLikeList:[],
		movieData:{},
		commentScoreObj:{}
	});

	const [WindowIsShow, setWindowIsShow] = useState(false)

	const params = useParams()

	//getData
	useEffect(()=>{
		axios.get("/api/detail/"+params.movie_id)
			.then((res)=>{
				setData(res.data.data)
			})
	},[params.movie_id])

	const {movieData,commentScoreObj,maybeLikeList} = data
	return (
		<Fragment>
			<CommonHeader/>
			<BaseBody
				title={movieData.name}
				left={
					<Fragment>
						<div className={style.movieContent}>
							<div className={style.movieContentImgWrapper}>
								<img src={movieData.cover}/>
							</div>
							<div className={style.movieContentDesc}>
								<CommonLabel label="导演" content={movieData.director} pathName="celebrity"/>
								<CommonLabel label="编剧" content={movieData.author} pathName="celebrity"/>
								<CommonLabel label="主演" content={movieData.toStar} pathName="celebrity"/>
								<CommonLabel label="类型" content={movieData.type}/>
								<CommonLabel label="官方网站" content={movieData.web}/>
								<CommonLabel label="制片国家/地区" content={movieData.country}/>
								<CommonLabel label="语言" content={movieData.language}/>
								{ movieData.time && <CommonLabel label="上映时间" content={timeFormatChange(movieData.time)}/>}
								<CommonLabel label="片长" content={movieData.timeLen}/>
								<CommonLabel label="别名" content={movieData.anotherName}/>
								<CommonLabel label="IMDB链接" content={movieData.indbLink}/>
							</div>
							<div className={style.movieContentScore}>
								<div className={style.movieContentScoreTitle}>豆瓣评分</div>
								<div className={[style.scoreLine,style.clearfix].join(" ")}>
									<div className={style.num}>{movieData.movieScore}</div>
									<div className={style.starWrapper}>
										<Star score={movieData.movieScore}/>
										<div>{movieData.longCommentsCount + movieData.commentsCount}人评价</div>
									</div>
								</div>
								<div className={style.ratingPercentWrapper}>
									<RatingPercent commentScoreObj={commentScoreObj}/>
								</div>
							</div>
							<div className={style.movieButtonList}>
								<a className={style.movieButtonItem} onClick={windowShow}>写短评</a>
								<Link  to="/writeLongComment/1" className={style.movieButtonItem}>写影评</Link>
							</div>
						</div>
						<CommonTitle title={movieData.name + "的剧情简介"} />
						<div className={style.movieBrief} dangerouslySetInnerHTML={{__html:movieData.brief}}/>
						<CommonTitle title={"喜欢这部电影的人也喜欢"}/>
						<PhotoBox photoBox={maybeLikeList} height={'163px'}/>
						<CommonTitle title={movieData.name + "的短评"} content={`全部${movieData.commentsCount}条`} link={`/shortComments/${movieData.id}/1/all`}/>
						<CommonTitle title={movieData.name + "的长评"} content={`全部${movieData.longCommentsCount}条`} link={`/longComments/${movieData.id}/1`}/>
					</Fragment>
				}
			/>
			<MovieCommentWindow
				movie_id={movieData.id}
				WindowIsShow={WindowIsShow}
				closeWindow={closeWindow}
			/>
			<CommonFooter/>
		</Fragment>
	)

	function windowShow(){
		setWindowIsShow(true)
	}

	function closeWindow(){
		setWindowIsShow(false)
	}

	function timeFormatChange(time){
		return time.substring(0,10)
	}


}

export default Detail;
