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


const Detail = () => {
	const [data, setData] = useState({
		maybeLikeList:[],
		movieData:{},
		commentScoreObj:{}
	});

	let params = useParams()

	//getData
	useEffect(()=>{
		axios.get("/api/detail/"+params.movie_id)
			.then((res)=>{
				setData(res.data.data)
			})
	},[])

	const {movieData,commentScoreObj,maybeLikeList} = data
	return (

		<Fragment>
			<CommonHeader/>
			<BaseBody
				title={movieData.name}
				left={
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
							<CommonLabel label="上映时间" content={movieData.time}/>
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
							<a className={style.movieButtonItem} onClick={writeShortComment}>写短评</a>
							<Link  to="/" className={style.movieButtonItem}>写影评</Link>
						</div>
					</div>
				}
				right={<div>2</div>}
			/>
			<MovieCommentWindow/>
			<CommonFooter/>
		</Fragment>
	)

	function writeShortComment(){
		document.title=document.title+1
	}
}

// class Detail extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			maybeLikeList:[],
// 			movieData:{},
// 			commentScoreObj:{}
// 		}
// 	}
//
// 	render() {
// 		const {movieData} = this.state
// 		return (
// 			<Fragment>
// 				<CommonHeader/>
// 				<BaseBody
// 					title={movieData.name}
// 					left={
// 							<div className={style.movieContent}>
// 								<div className={style.movieContentImgWrapper}>
// 									<img src={movieData.cover}/>
// 								</div>
// 								<div className={style.movieContentDesc}>
// 									<CommonLabel label="导演" content={movieData.director} pathName="celebrity"/>
// 									<CommonLabel label="编剧" content={movieData.author} pathName="celebrity"/>
// 									<CommonLabel label="主演" content={movieData.toStar} pathName="celebrity"/>
// 									<CommonLabel label="类型" content={movieData.type}/>
// 									<CommonLabel label="官方网站" content={movieData.web}/>
// 									<CommonLabel label="制片国家/地区" content={movieData.country}/>
// 									<CommonLabel label="语言" content={movieData.language}/>
// 									<CommonLabel label="上映时间" content={movieData.time}/>
// 									<CommonLabel label="片长" content={movieData.timeLen}/>
// 									<CommonLabel label="别名" content={movieData.anotherName}/>
// 									<CommonLabel label="IMDB链接" content={movieData.indbLink}/>
// 								</div>
// 								<div className={style.movieContentScore}>
// 									<div className={style.movieContentScoreTitle}>豆瓣评分</div>
// 									<div className={[style.scoreLine,style.clearfix].join(" ")}>
// 										<div className={style.num}>{movieData.movieScore}</div>
// 										<div className={style.starWrapper}>
// 											<Star score={movieData.movieScore}/>
// 											<div>{movieData.longCommentsCount + movieData.commentsCount}人评价</div>
// 										</div>
// 									</div>
// 									<div className={style.ratingPercentWrapper}>
// 										<RatingPercent commentScoreObj={this.state.commentScoreObj}/>
// 									</div>
// 								</div>
// 								<div className={style.movieButtonList}>
// 									<a className={style.movieButtonItem} onClick>写短评</a>
// 									<Link  to="/" className={style.movieButtonItem}>写影评</Link>
// 								</div>
// 							</div>
// 					}
// 					right={<div>2</div>}
// 				/>
// 				<CommonFooter/>
// 			</Fragment>
// 		)
// 	}
//
// 	componentDidMount() {
// 			axios.get('/api/detail/'+parseInt(this.props.match.params.movie_id))
// 				.then((res) => {
// 					if(res.data.errno == 0){
// 						this.setState((prevState) => {
// 							return {
// 								maybeLikeList:res.data.data.maybeLikeList,
// 								movieData:res.data.data.movieData,
// 								commentScoreObj:res.data.data.commentScoreObj
// 							}
// 						})
// 					}
// 				})
// 				.catch(function (error){
// 					console.log(error)
// 				})
// 	}
//
// }

export default Detail;
