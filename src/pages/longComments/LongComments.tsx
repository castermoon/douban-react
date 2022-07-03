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
import LongCommentItem from "../../common/longCommentItem/LongCommentItem";

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
									return <LongCommentItem longComment={item} key={item.id}/>
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

}


export default LongComments;

