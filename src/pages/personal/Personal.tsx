import CommonTopHeader from "../../common/commonTopHeader/CommonTopHeader";
import PersonalHeader from "../../common/personalHeader/PersonalHeader";
import style from "./personal.styl"
import React,{Fragment,useState,useEffect} from "react"
import BaseBody from "../../common/baseBody/BaseBody";
import { useParams,Link } from "react-router-dom"
import axios from "axios"
import CommonTitle from "../../common/commonTitle/CommonTitle";
import Star from "../../common/star/Star";
import CommonFooter from "../../common/commonFooter/CommonFooter";
interface userInfoType{
	id: number;
	username: string;
	nickname: string;
}

interface userLongCommentItemType{
	id: number;
	user_id: number;
	movie_id: number;
	content: string;
	date: number;
	score: number;
	spoiler: number;
	title: string;
	movie_name: string;
	cover: string;
	nickName: string;
}

const Personal:React.FC = () => {

	const params = useParams()
	const { user_id } = params
	const [userInfo,setUserInfo] = useState<userInfoType>({} as userInfoType);
	const [userLongComments, setUserLongComments] = useState<userLongCommentItemType[]>([]);

	//getData
	useEffect(()=>{
		axios.get(`/api/personal/${user_id}`)
			.then((res)=>{
				setUserInfo(res.data.data.userInfo)
				setUserLongComments(res.data.data.userLongComments)
			})
	},[user_id])


	return(
		<Fragment>
			<CommonTopHeader/>
			<PersonalHeader/>
			<BaseBody
				left={
					<Fragment>
						<div className={style.personal_info}>
							<img className={style.icon} src="https://images.weserv.nl/?url=img2.doubanio.com/icon/u1854660-2473.jpg"/>
							<div className={style.personal_info_right}>
								<h1 className={style.name}>{userInfo.nickname}</h1>
								<div className={style.autograph}>(添加签名档)</div>
							</div>
						</div>
						<ul className={style.info_title_list}>
							<li className={style.info_title_item}>我的主页</li>
							<li className={style.info_title_item}>广播</li>
							<li className={style.info_title_item}>相册</li>
							<li className={style.info_title_item}>日记</li>
							<li className={style.info_title_item}>豆列</li>
							<li className={style.info_title_item}>片单|书单</li>
							<li className={style.info_title_item}>设置</li>
						</ul>
						<CommonTitle  title={'我的评论'} content={'评论'} link={"/"}/>
						<ul className={style.my_comments_list}>
							{
								userLongComments.length > 0 && userLongComments.map(item => {
									return <li key={item.id}  className={style.my_comments_item}>
										<div className={style.work_cover_wrapper}><img className={style.work_cover}  src={item.cover}/></div>
										<div className={style.my_comments_item_right}>
											<div className={style.title}>
												<Link to={`/longCommentDetail/${item.id}/0`}>长评的标题。</Link>
											</div>
											<div className={style.info}>
												<span className={style.Commentator}><a href="#">{item.nickName}</a></span>
												评论:<span className={style.Comment_works}><a href="#">{item.movie_name}</a></span>
												<div className={style.star_wrapper}>
													<Star score={item.score}/>
												</div>
											</div>
											<p className={style.comment_content}>{item.content}</p>
										</div>
									</li>
								})
							}
						</ul>
					</Fragment>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)
}

export default Personal
