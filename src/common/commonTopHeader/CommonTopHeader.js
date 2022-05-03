import React, {useState,useEffect} from "react"
import style from "./commonTopHeader.styl"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import store from "../../store";
const CommonTopHeader = () => {
	const navigate = useNavigate()


	const [dropMenuShow,setDropMenuShow] = useState(false)
	const [userInfo,setUserInfo] = useState(null)
	const [noticeNum,setNoticeNum] = useState(0)

	useEffect(()=>{
		isLogin()
		// getNoticeNum()
	},[])

	useEffect(()=>{
		getNoticeNum()
	},[userInfo])

	return (
		<div className={style.commonTopHeader}>
			<ul className={style.headerLeft}>
				<li className={style.headerLink}><a href="#" className={style.name}>豆瓣</a></li>
				<li className={style.headerLink}><a href="#">读书</a></li>
				<li className={style.headerLink}><a href="#">电影</a></li>
				<li className={style.headerLink}><a href="#">音乐</a></li>
				<li className={style.headerLink}><a href="#">同城</a></li>
				<li className={style.headerLink}><a href="#">小组</a></li>
				<li className={style.headerLink}><a href="#">阅读</a></li>
				<li className={style.headerLink}><a href="#">FM</a></li>
			</ul>
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
		}).then((res) => {
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

				navigate("/login")
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	function getNoticeNum(){
		if(!userInfo){
			return
		}
		if(userInfo.id){
			axios.get('/api/user/notice',{
			}).then((res) => {
				if(res.data.errno == 0){
					setNoticeNum(res.data.data.noticeNum)
				}
			}).catch((err) => {
				console.log(err)
			})
		}
	}
}





export default CommonTopHeader;
