import CommonTopHeader from "../../common/commonTopHeader/CommonTopHeader";
import PersonalHeader from "../../common/personalHeader/PersonalHeader";
import style from "./notice.styl"
import React,{Fragment} from "react"
import { Link } from "react-router-dom"
import BaseBody from "../../common/baseBody/BaseBody";
const Notice = () => {
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
}

export default Notice
