// import CommonTopHeader from "../../common/commonTopHeader/CommonTopHeader";
// import PersonalHeader from "../../common/personalHeader/PersonalHeader";
// import style from "./notice.styl"
// import React,{Fragment,useEffect,useState} from "react"
// import { Link,useParams,useNavigate } from "react-router-dom"
// import axios from "axios"
// import BaseBody from "../../common/baseBody/BaseBody";
//
// interface noticeItem{
// 	id: number;
// 	replier_id: number;
// 	respondent_id: number;
// 	longComment_id: number;
// 	scrollTop: number;
// 	date: number;
// 	title: string;
// 	replierName: string;
// }
// const Notice:React.FC = () => {
// 	const params = useParams()
// 	const { user_id } = params
// 	const [noticeList, setNoticeList] = useState<noticeItem[]>([])
//
// 	//getData
// 	useEffect(() => {
// 		axios.get(`/api/notice/${user_id}`, {
// 		}).then(getNoticeInfoSucc)
// 	},[])
//
// 	return(
// 		<Fragment>
// 			<CommonTopHeader/>
// 			<PersonalHeader/>
// 			<BaseBody
// 				title={"我的提醒"}
// 				left={
// 					<ul className={style.noticeList}>
// 						{
// 							noticeList.length > 0 && noticeList.map(item => {
// 								return <li className={style.noticeListItem} key={item.id}>
// 								<a  className={style.replierName}>{ item.replierName }</a>回复了您的帖子<Link className={style.longCommentName} to={`/longCommentDetail/${item.longComment_id}/${item.scrollTop}`} >{ item.title }</Link>
// 								<div className={style.noRemind} onClick={() => {delNotice(item.id)}}>不再提醒</div>
// 							</li>
// 							})
// 						}
//
// 					</ul>
// 				}
// 			/>
// 			</Fragment>
// 	)
//
// 	function delNotice(noticeId:number){
// 		axios.post('/api/notice/delNotice',{
// 			id:noticeId
// 		}).then((res)=>{
// 			console.log(res)
// 		}).catch((err)=>{
// 			console.log(err)
// 		})
// 	}
//
// 	function getNoticeInfoSucc (res:any) {
// 		res = res.data
// 		if (res.errno === 0 && res.data) {
// 			const data = res.data
// 			setNoticeList(data.noticeList)
// 		}
// 	}
// }
//
// export default Notice
import CommonTopHeader from "../../common/commonTopHeader/CommonTopHeader";
import PersonalHeader from "../../common/personalHeader/PersonalHeader";
import style from "./notice.styl"
import React,{Fragment,useEffect,useState} from "react"
import { Link,useParams,useNavigate } from "react-router-dom"
import axios from "axios"
import BaseBody from "../../common/baseBody/BaseBody";
const Notice = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { user_id } = params
	const [noticeList, setNoticeList] = useState([])

	//getData
	useEffect(() => {
		axios.get(`/api/notice/${user_id}`, {
		}).then(getNoticeInfoSucc)
	},[])

	return(
		<Fragment>
			<CommonTopHeader/>
			<PersonalHeader/>
			<BaseBody
				title={"我的提醒"}
				left={
					<ul className={style.noticeList}>
						{
							noticeList.length > 0 && noticeList.map(item => {
								return <li className={style.noticeListItem} key={item.id}>
									<a  className={style.replierName}>{ item.replierName }</a>回复了您的帖子<Link className={style.longCommentName} to={`/longCommentDetail/${item.longComment_id}/${item.scrollTop}`} >{ item.title }</Link>
									<div className={style.noRemind} onClick={() => {delNotice(item.id)}}>不再提醒</div>
								</li>
							})
						}

					</ul>
				}
			/>
		</Fragment>
	)

	function delNotice(noticeId){
		axios.post('/api/notice/delNotice',{
			id:noticeId
		}).then((res)=>{
			console.log(res)
		}).catch((err)=>{
			console.log(err)
		})
	}

	function getNoticeInfoSucc (res) {
		res = res.data
		if (res.errno === 0 && res.data) {
			const data = res.data
			setNoticeList(data.noticeList)
		}
	}
}

export default Notice
