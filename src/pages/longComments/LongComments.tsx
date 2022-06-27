import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./longComments.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import {Link,useParams } from "react-router-dom"
import Pagination from "../../common/pagination/Pagination";
import CommonMovieData from "../../common/commonMovieData/CommonMovieData";
import Star from "../../common/star/Star";

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
}


interface longCommentListItemType{
	id: number;
	user_id: number;
	movie_id: number;
	content: string;
	date: number;
	score: number;
	spoiler: number;
	title: string;
	nickname: string;
}

const LongComments:React.FC = () => {

	const [CommentsMovieData, setCommentsMovieData] = useState<CommentsMovieDataType>({} as CommentsMovieDataType);
	const [longCommentList, setLongCommentList] = useState<longCommentListItemType[]>([]);

	const params = useParams()

	const { movie_id, page } = params

	//getData
	useEffect(()=>{
		axios.get(`/api/longComments/${movie_id}/${page}`)
			.then((res)=>{
				const data = res.data.data
				setCommentsMovieData(data.CommentsMovieData)
				setLongCommentList(data.longCommentList)
			})
	},[movie_id, page])

	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				title={CommentsMovieData.name+" 的评论"}
				left={
					<Fragment>
						<div className={style.topTab}>
							<Link to={`/writeLongComment/${movie_id}`} className={style.writeLongComment}	>我来写评论</Link>
						</div>
						<ul className={style.longCommentsList}>
							{
								longCommentList.length > 0 && longCommentList.map(item => {
									return <li className={style.longCommentsListItem} key={item.id}>
										<div className={style.longCommentsListItemHeader}>
											<img className={style.icon} src="https://img2.doubanio.com/icon/u155190344-21.jpg" alt=""/>
											<div className={style.name}><a href="#">{item.nickname}</a></div>
											<div className={style.starWrapper}>
												<Star score={item.score}/>
											</div>
											<div className={style.date}>{timestampChange(item.date)}</div>
										</div>
										<Link to={`/longCommentDetail/${item.id}/0`} className={style.longCommentsListItemTitle}>{ item.title }</Link>
										{ item.spoiler && <div className={style.Spoiler}>| 这篇影评可能有剧透</div> }
										<p className={style.longCommentsListItemContent}>
											{item.content}
										</p>
									</li>
								})
							}
						</ul>
						<Pagination pageName={"longComments"}/>
					</Fragment>
				}
				right={
					<CommonMovieData CommentsMovieData={CommentsMovieData}/>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)

	function timestampChange(timestamp:number) {
		var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	}
}


export default LongComments;

