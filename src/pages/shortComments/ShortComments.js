import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./shortComments.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import Star from "../../common/star/Star";
import {Link,useParams,useNavigate } from "react-router-dom"
import Pagination from "../../common/pagination/Pagination";
import CommonMovieData from "../../common/commonMovieData/CommonMovieData";
import store from "../../store";
import MovieCommentWindow from "../../common/movieCommentWindow/MovieCommentWindow";
const ShortComments = () => {
	const [data, setData] = useState({
		CommentsMovieData:{},
		commentList:[],
	});
	const params = useParams(),navigate = useNavigate();

	const { movie_id, page, commentType } = params
	const [WindowIsShow, setWindowIsShow] = useState(false)

	//getData
	useEffect(()=>{
		axios.get(`/api/comments/${movie_id}/${page}/${commentType}`)
			.then((res)=>{
				setData(res.data.data)
			})
	},[movie_id, page, commentType])

	const { CommentsMovieData,commentList } = data
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
										commentList.map(item => {
											return <li className={style.commentListItem} key={item.id}>
												<div className={style.commentDesc}>
													<div className={style.commentDescHeader}>
														<img className={style.icon} src="https://img2.doubanio.com/icon/u155190344-21.jpg"/>
														<div className={style.name}><a href="#">{item.nickname}</a></div>
														{item.score > 0 &&  <span>看过</span>}
														{item.score === 0 && <span>想看</span>}
														{item.score > 0 &&
															<div className={style.starWrapper}>
																<Star score={item.score}/>
															</div>
														}
														<span className={style.date}>{item.date}</span>
													</div>
													<div className={style.commentContent}>
														{item.content}
													</div>
												</div>
											</li>
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
	function commentTypeChange(e){
		const value = e.target.value
		navigate(`/shortComments/${movie_id}/1/${value}`)
	}
	function writeShortComment(e){
		e.stopPropagation()
		setWindowIsShow(true)
	}

	function closeWindow(){
		setWindowIsShow(false)
	}

}


export default ShortComments;
