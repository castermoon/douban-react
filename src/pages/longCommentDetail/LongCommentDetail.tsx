import React, { Fragment,useState, useEffect,useRef } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./longCommentDetail.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import { useParams } from "react-router-dom"
import store from "../../store";
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

interface longCommentDetailType{
	id: number,
	user_id: number,
	movie_id: number,
	content: string,
	date: number;
	score: number;
	spoiler: number;
	title: string;
	nickName: string;
}
interface secondResListType{
	secondRes_id: number;
	secondRes_userId: number;
	secondRes_name: string;
	secondRes_respond_id: number;
	secondRes_respond_name: string;
	secondRes_content: string;
	secondRes_date: number;
	respondInputIsShow?:boolean;
}

interface longCommentDetailResType{
	id:number;
	firstRes_userId:number;
	firstRes_name:string;
	firstRes_content:string;
	firstRes_date:number;
	secondResList:secondResListType[];
	respondInputIsShow?:boolean;
}



const LongCommentDetail:React.FC = () => {
	const params = useParams()
	const { longCommentDetail_id,scrollTop } = params

	const [CommentsMovieData, setCommentsMovieData] = useState<CommentsMovieDataType>({} as CommentsMovieDataType);
	const [longCommentDetailRes, setLongCommentDetailRes] = useState<longCommentDetailResType[]>([]);
	const [longCommentDetail, setLongCommentDetail] = useState<longCommentDetailType>({} as longCommentDetailType);
	const [resInputContent, setResInputContent] = useState("");
	const [myRespondInputContent, setMyRespondInputContent] = useState("");

	const respondItemList = useRef<HTMLElement[]>([])

	//getData
	useEffect(()=>{
		axios.get(`/api/longCommentDetail/${longCommentDetail_id}`)
			.then((res)=>{
				setCommentsMovieData(res.data.data.CommentsMovieData)
				setLongCommentDetail(res.data.data.longCommentDetail)

				//给每一条父级回复和子级回复都添加上回复框是否显示的属性respondInputIsShow
				const longCommentDetailRes = res.data.data.longCommentDetailRes
				longCommentDetailRes.forEach((item :longCommentDetailResType) => {
					item["respondInputIsShow"] = false
					item.secondResList.forEach((item2) => {
						item2["respondInputIsShow"] = false
					})
				})
				setLongCommentDetailRes(longCommentDetailRes)

			})
	},[longCommentDetail_id])

	//当进入页面时，会根据路由参数scrollTop滚到到指定位置，延迟500毫秒执行是因为刚进入页面时没有数据所以页面整体高度还没有构建好
	useEffect(() => {
		setTimeout(() => {
			if(scrollTop){
				window.scrollTo(0,parseInt(scrollTop))
			}
		},500)
	},[])


	return(
		<div onClick={(event => {respondInputHide(event)})}>
			<CommonHeader />
			<BaseBody
				title={longCommentDetail.title}
				left={
					<Fragment>
						<div className={style.long_comment_body}>
							<div className={style.long_comment_header}>
								<img className={style.icon}
										 src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344_21.jpg"
								/>
								<div className={style.name}><a href="#">{longCommentDetail.nickName}</a></div>
								<div className={style.star_wrapper}>
									<Star score={longCommentDetail.score}/>
								</div>
								<div className={style.date}>{longCommentDetail.date}</div>
							</div>
							{CommentsMovieData.spoiler && <div className={style.Spoiler}>| 这篇影评可能有剧透</div>}
							<p className={style.long_comment_content} dangerouslySetInnerHTML={{__html: longCommentDetail.content}}/>
							<div className={style.copyright}>
								© 本文版权归作者&nbsp;{longCommentDetail.nickName}&nbsp;所有，任何形式转载请联系作者。
							</div>
						</div>
						<ul className={style.respond_list}>
							{
								longCommentDetailRes.length > 0 && longCommentDetailRes.map((item,index) => {
									// @ts-ignore
									return 	<li className={style.respond_item}  key={item.id} ref={getRef}>
										<div className={style.respond_item_left}>
											<img className={style.respond_item_icon} src="https://img2.doubanio.com/icon/up208248294_1.jpg"/>
										</div>
										<div className={style.respond_item_right}>
											<div className={style.respond_user_info}>
												<a  href="#" className={style.respond_user_name}>{item.firstRes_name}</a>
												<div className={style.respond_date}>{timestampChange(item.firstRes_date) }</div>
											</div>
											<div className={style.respond_content}>{item.firstRes_content}</div>
											<div className={style.respond_item_right_bottom} >
												<span onClick={(event) => {respondInputShow(event,item.id,"first")}}>回应</span>
											</div>
											{ item.respondInputIsShow &&
											<div className={style.respond_input_container}>
												<input className={style.respondInput} value={resInputContent} onChange={resInputContentChange}/>
												<button className={style.respond_btn} onClick={(event => { createResRes(event,item.id, item.firstRes_userId, index) })}>加上去</button>
											</div>
											}
											<ul className={style.resRes_list}>
												{
													item.secondResList.length > 0 && item.secondResList.map((secondResItem,index2) => {
														return <li className={style.resRes_item} key={secondResItem.secondRes_id}>
															<div className={style.resRes_item_left}>
																<img className={style.resRes_item_icon} src="https://img2.doubanio.com/icon/up208248294_1.jpg"/>
															</div>
															<div className={style.resRes_item_right}>
																<div className={style.resRes_user_info}>
																	<a  href="#" className={style.resRes_user_name}>{secondResItem.secondRes_name}</a>
																	<div className={style.resRes_date}>{ secondResItem.secondRes_date }</div>
																</div>
																<div className={style.resRes_content}><a href="." className={style.resRes_name}>@{secondResItem.secondRes_respond_name}</a>{secondResItem.secondRes_content}</div>
																<div className={style.resRes_item_right_bottom} >
																	<span onClick={(event) => {respondInputShow(event,secondResItem.secondRes_id,"second")}}>回应</span>
																</div>
																{
																	secondResItem.respondInputIsShow &&
																	<div className={style.respond_input_container}>
																		<input className={style.respondInput} onChange={resInputContentChange} value={resInputContent}/>
																		<button
																			className={style.respond_btn}
																			onClick={(event) =>{ createResRes(event,item.id, secondResItem.secondRes_userId, index)}}
																		>加上去
																		</button>
																	</div>
																}
															</div>
														</li>
													})
												}
											</ul>
										</div>
									</li>
								})
							}
						</ul>
						<div className={style.my_respond}>
							<div className={style.my_respond_left}>
								<img className={style.my_respond_icon} src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344_21.jpg"/>
							</div>
							<textarea
								className={style.my_respond_input}
								placeholder="添加回应"
								onChange={myRespondInputChange}
								value={myRespondInputContent}
							/>
						</div>
						<button className={style.my_respond_btn} onClick={createMyRespond}>加上去</button>
					</Fragment>
					}
				right={
					<CommonMovieData CommentsMovieData={CommentsMovieData}/>
				}
			/>
			<CommonFooter/>
		</div>
	)

	function myRespondInputChange(e:any){
		const value = e.target.value
		setMyRespondInputContent(value)
	}

	function resInputContentChange(e:React.ChangeEvent<HTMLInputElement>){
		const value = e.target.value
		setResInputContent(value)
	}

	function createMyRespond (){
		if(myRespondInputContent.trim() === ""){
			alert("没有输入回应内容")
			return
		}
		axios.post('/api/longCommentDetail/createLongCommentRes',{
			longComment_id:longCommentDetail.id,
			content:myRespondInputContent.trim(),
			scrollTop:document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
			respondent_id:longCommentDetail.user_id
		})
		.then((data) => {
			setMyRespondInputContent("")
			window.location.reload()
		})
		.catch((err) => {
			console.log(err)
		})
	}


	function createResRes(event:any,longCommentRes_id:number,respond_id:number,index:number):void{
		if(resInputContent.trim() === ""){
			alert("没有输入回应内容")
			return
		}

		//index表示被回复楼层所在列表的索引。
		console.log(respondItemList)
		let _scrollTop = respondItemList.current[index].offsetTop + respondItemList.current[index].offsetHeight - 200

		axios.post('/api/longCommentDetail/createLongCommentResRes',{
			longCommentRespond_id:longCommentRes_id,
			longComment_id:longCommentDetail.id,
			respond_id:respond_id,
			content:resInputContent.trim(),
			scrollTop:_scrollTop
		})
			.then((data) => {
				console.log(data)
				window.location.reload()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	function respondInputShow(event:any,id:number,type:string){
		event.stopPropagation()
		setResInputContent("")
		const cloneLongCommentDetailRes = JSON.parse(JSON.stringify(longCommentDetailRes))
		for(let i = 0;i < cloneLongCommentDetailRes.length;i++){
			const first = cloneLongCommentDetailRes[i]
			if(id === first.id && type === "first"){
				first.respondInputIsShow = true
			}else {
				first.respondInputIsShow = false
			}
			for(let j = 0;j < first.secondResList.length;j++){
				const second = first.secondResList[j]
				if(id === second.secondRes_id && type === "second"){
					second.respondInputIsShow = true
				}else {
					second.respondInputIsShow = false
				}
			}
		}
		setLongCommentDetailRes(cloneLongCommentDetailRes)
	}

	function respondInputHide(event:any){
		if(event.target !== event.currentTarget){
			return
		}
		const cloneLongCommentDetailRes = JSON.parse(JSON.stringify(longCommentDetailRes))
		cloneLongCommentDetailRes.forEach((item:longCommentDetailResType ) => {
			item.respondInputIsShow = false
			item.secondResList.forEach((item2) => {
				item2.respondInputIsShow = false
			})
		})
		setLongCommentDetailRes(cloneLongCommentDetailRes)
	}

	function getRef(dom:HTMLElement) {
		respondItemList.current.push(dom)
	}

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



export default LongCommentDetail;


