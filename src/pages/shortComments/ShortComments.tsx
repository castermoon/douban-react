import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./shortComments.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import Star from "../../common/star/Star";
import {useParams,useNavigate } from "react-router-dom"
import Pagination from "../../common/pagination/Pagination";
import CommonMovieData from "../../common/commonMovieData/CommonMovieData";
import MovieCommentWindow from "../../common/movieCommentWindow/MovieCommentWindow";
import CommentItem from "../../common/commentItem/CommentItem";

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

interface commentListType{
	id: number;
	content: string;
	date: number;
	score: number;
	user_id: number;
	movie_id: number;
	status: number;
	labelList: string;
	onlyMe: number;
	isShare: number;
	nickname: string;
}

const ShortComments = () => {


	const [CommentsMovieData, setCommentsMovieData] = useState<CommentsMovieDataType>({} as CommentsMovieDataType);
	const [commentList, setCommentList] = useState<commentListType[]>([]);
	const params = useParams(),navigate = useNavigate();

	const { movie_id, page, commentType } = params
	const [WindowIsShow, setWindowIsShow] = useState<Boolean>(false)

	//getData
	useEffect(()=>{
		axios.get(`/api/comments/${movie_id}/${page}/${commentType}`)
			.then((res)=>{
				const data = res.data.data
				setCommentsMovieData(data.CommentsMovieData)
				setCommentList(data.commentList)
			})
	},[movie_id, page, commentType])

	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				title={CommentsMovieData.name+ "的短评"}
				left={
					<Fragment>
						<div className={style.tab}>
							<div className={style.tabHeader} onClick={commentTypeChange}>
								<button className={[style.tabHeaderItem,commentType !== 'noLooked' ? style.isActive : ""].join(" ")} value ="all">看过</button>
								<button className={[style.tabHeaderItem,commentType === 'noLooked' ? style.isActive : ""].join(" ")} value ="noLooked">想看</button>
								<div className={style.writeShortComment} onClick={event => {writeShortComment(event)}}>我来写短评</div>
							</div>
							<div className={style.tabBody}>
								<div className={style.commentFilter} onChange={commentTypeChange}>
									<label>
										<input type="radio" name="sort" value="all"/>
										<span >全部</span>
									</label>
									<label>
										<input type="radio" name="sort" value="good"/>
										<span>好评</span>
									</label>
									<label>
										<input type="radio" name="sort" value="normal"/>
										<span>一般</span>
									</label>
									<label>
										<input type="radio" name="sort" value="bad"/>
										<span>差评</span>
									</label>
								</div>
								<ul className={style.commentList}>
									{
										commentList.length > 0 && commentList.map(item => {
											return <CommentItem comment={item}/>
										})
									}
								</ul>
							</div>
						</div>
						<Pagination pageName={"shortComments"}/>
					</Fragment>
				}
				right={
					<CommonMovieData CommentsMovieData={CommentsMovieData}/>
				}
			/>
			<MovieCommentWindow
				movie_id={CommentsMovieData.id}
				WindowIsShow={WindowIsShow}
				closeWindow={closeWindow}
			/>
			<CommonFooter/>
		</Fragment>
	)
	function commentTypeChange(e:any){
		const value = e.target.value
		navigate(`/shortComments/${movie_id}/1/${value}`)
	}
	function writeShortComment(e:any){
		e.stopPropagation()
		setWindowIsShow(true)
	}

	function closeWindow(){
		setWindowIsShow(false)
	}



}


export default ShortComments;
