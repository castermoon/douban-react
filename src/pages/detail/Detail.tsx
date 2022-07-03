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
import CommentItem from "../../common/commentItem/CommentItem";
import LongCommentItem from "../../common/longCommentItem/LongCommentItem";

interface maybeLikeListItemType{
	id:number;
	cover:string;
	name:string;
}

interface movieDatatype{
	id:number;
	name:string;
	cover:string;
	type:string;
	web:string;
	country:string;
	language:string;
	time:string;
	timeLen:number;
	anotherName:string;
	brief:string;
	score:number;
	director?:celebrityType[];
	toStar?:celebrityType[];
	author?:celebrityType[];
	commentsCount:number;
	longCommentsCount:number;
	movieScore:number;
	indbLink?:string;
}

interface celebrityType{
	id:number;
	name:string;
}


interface commentScoreObjType{
	2:string;
	4:string;
	6:string;
	8:string;
	10:string;
}

interface recentCommentItemType{
	id: number,
	content: string,
	date: number,
	score: number,
	user_id: number,
	movie_id: number,
	nickname: string
}

interface recentLongCommentItemType{
	id: number,
	content: string,
	date: number,
	score: number,
	movie_id: number,
	title: string
	user_id: number,
	spoiler: number,
	nickname: string
}


const Detail:React.FC = () => {

	const [maybeLikeList,setMaybeLikeList] = useState<maybeLikeListItemType[]>([])
	const [movieData,setMovieData] = useState<movieDatatype>({} as movieDatatype)
	const [commentScoreObj,setCommentScoreObj] = useState<commentScoreObjType>({} as commentScoreObjType)
	const [WindowIsShow, setWindowIsShow] = useState(false)
	const [recentCommentList,setRecentCommentList] = useState<recentCommentItemType[]>([])
	const [recentLongCommentList,setRecentLongCommentList] = useState<recentLongCommentItemType[]>([])

	const params = useParams()


	//getData
	useEffect(()=>{
		axios.get("/api/detail/"+params.movie_id)
			.then((res)=>{
				let data = res.data.data
				setMovieData(data.movieData)
				setMaybeLikeList(data.maybeLikeList)
				setCommentScoreObj(data.commentScoreObj)
				setRecentCommentList(data.recentCommentList)
				setRecentLongCommentList(data.recentLongCommentList)
			})
	},[params.movie_id])

	return (
		<Fragment>
			<CommonHeader/>
			<BaseBody
				title={movieData.name}
				left={
					<Fragment>
						<div className={style.movieContent}>
							<div className={style.movieContentImgWrapper}>
								<img src={movieData.cover} alt="电影封面"/>
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
						<PhotoBox photoBox={maybeLikeList} height={'163px'} />
						<CommonTitle title={movieData.name + "的短评"} content={`全部${movieData.commentsCount}条`} link={`/shortComments/${movieData.id}/1/all`}/>
						<ul className={style.commentList}>
							{
								recentCommentList.length > 0 && recentCommentList.map(item => {
									return 	<CommentItem comment={item} key={item.id}/>
								})
							}
						</ul>
						<CommonTitle title={movieData.name + "影评"} content={`全部${movieData.longCommentsCount}条`} link={`/longComments/${movieData.id}/1`}/>
						<ul className={style.longCommentsList}>
							{
								recentLongCommentList.length > 0 && recentLongCommentList.map(item => {
									return 	<LongCommentItem longComment={item}/>
								})
							}
						</ul>
					</Fragment>
				}
				right={
					<div className={style.movie_list_recommend}>
						<CommonTitle title={"以下片单推荐"}/>
						<ul className={style.recommend_list}>
							<li className={style.recommend_item}>豆瓣电影【口碑榜】2022-06-13 更新 (影志)</li>
							<li className={style.recommend_item}>评价人数超过十万的电影 (依然饭特稀)</li>
							<li className={style.recommend_item}>一个人的电影院 (刺青童)</li>
							<li className={style.recommend_item}>2022—2024值得关注的华语电影 (closer)</li>
							<li className={style.recommend_item}>豆瓣电影【口碑榜】2022-06-13 更新 (影志)</li>
							<li className={style.recommend_item}>豆瓣评价人数过十万的影片〖国产篇〗 (莉莉周)</li>
						</ul>
					</div>
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

	function timeFormatChange(time:string){
		return time.substring(0,10)
	}


}

export default Detail;


