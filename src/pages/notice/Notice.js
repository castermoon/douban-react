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

	// //getData
	// useEffect(() => {
	// 	axios.get(`/api/notice/${user_id}`, {
	// 	}).then(getNoticeInfoSucc)
	// },[])

	return(
		<Fragment>
			<CommonTopHeader/>
			<PersonalHeader/>
			<BaseBody
				title="我的提醒"
				left={
					1
					// <ul className={style.noticeList}>
					// 	<li className={style.noticeListItem} v-for="item of noticeList" :key="item.id">
					// 	<a href="." className={style.replierName}>{ item.replierName }</a>回复了您的帖子<Link className={style.longCommentName} to={path:'longCommentDetail',query:{longComment_id:item.longComment_id,scrollTop:item.scrollTop}} >{ item.title }</Link>
					// <div class="no-remind" @click="delNotice(item.id)">不再提醒</div>
					// </li>
					// </ul>
				}
				right={
					<div>2</div>
				}
			/>
			</Fragment>
	)

	function getNoticeInfoSucc (res) {
		res = res.data
		if (res.errno === 0 && res.data) {
			const data = res.data
		}
	}
}

export default Notice
