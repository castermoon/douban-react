import React, {useState,useEffect} from "react"
import style from "./commonTopHeader.styl"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import store from "../../store";

interface userInfoType{
	id: number;
	username: string;
	nickname: string;
}

const CommonTopHeader:React.FC = () => {
	const navigate = useNavigate()

	const [dropMenuShow,setDropMenuShow] = useState(false)
	const [userInfo,setUserInfo] = useState<userInfoType | null>(null )
	const [noticeNum,setNoticeNum] = useState(0)

	useEffect(()=>{
		isLogin()
		getNoticeNum()
	},[])

	return (
		<div className={style.commonTopHeader}>
			{/*<ul className={style.headerLeft}>*/}
			{/*	<li className={style.headerLink}><a href="#" className={style.name}>豆瓣</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">读书</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">电影</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">音乐</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">同城</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">小组</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">阅读</a></li>*/}
			{/*	<li className={style.headerLink}><a href="#">FM</a></li>*/}
			{/*</ul>*/}
			<div className={style.headerRight}>
				{  userInfo &&
					<Link to={`/notice/${userInfo.id}`} className={style.headerRightLink}>
						提醒
						{
							noticeNum > 0 &&
							<span className={style.noticeActive}>{noticeNum}</span>
						}
					</Link>
				}
				{ !userInfo && <Link to={"/login"} className={style.headerRightLink}>登录/注册</Link> }
				{
					userInfo &&
					<div className={style.dropDownMenu}>
						<a className={style.dropDownMenuBtn} onClick={dropMenuBtnClick}>{userInfo.nickname}的账号</a>
						<ul className={[style.dropDownMenuList,dropMenuShow ? style.isActive : ""].join(" ")}>
							<Link className={style.dropDownMenuItem} to={"/personal/1"}>个人主页</Link>
							<li className={style.dropDownMenuItem} onClick={logoutBtnClick}>退出</li>
						</ul>
					</div>
				}
			</div>
		</div>
	)

	function dropMenuBtnClick(){
		setDropMenuShow(!dropMenuShow)
	}

	function isLogin(){
		axios.get('/api/user/loginCheck',{
		}).then((res:any) => {
			res = res.data

			if(res.errno == 0){
				setUserInfo(res.data)
				const action = {
					type:"change_user_info",
					value:res.data
				}
				store.dispatch(action)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	function logoutBtnClick(){
		axios.get('/api/user/logout',{
		}).then((res) => {
			if(res.data.errno == 0){
				setUserInfo(null)

				const action = {
					type:"change_user_info",
					value:null
				}
				store.dispatch(action)
			}else {
				return
			}
			navigate("/login")
		}).catch((err) => {
			console.log(err)
		})
	}

	function getNoticeNum(){
		axios.get('/api/user/notice',{
		}).then((res) => {
			const data = res.data
			if(data.errno === 0){
				setNoticeNum(data.data.noticeNum)
			}else if(data.errno === 10002){
				// console.log("未登录")
			}
		}).catch((err) => {
			console.log(err)
		})
	}
}





export default CommonTopHeader;
