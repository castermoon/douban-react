import React, {Component} from "react"
import style from "./commonTopHeader.styl"
import { Link } from "react-router-dom"

const CommonTopHeader = () => {
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
				<Link to={"/notice/1"} className={style.headerRightLink}>提醒</Link>
				<Link to={"/login"} className={style.headerRightLink}>登录/注册</Link>
				<Link to={"/personal/1"} className={style.headerRightLink}>个人主页</Link>
				<div className={style.dropDownMenu}>
					<a className={style.dropDownMenuBtn}>的账号</a>
					<ul className={style.dropDownMenuList}>
						<li className={style.dropDownMenuItem}>
						</li>
						<li className={style.dropDownMenuItem}>退出</li>
					</ul>
				</div>
			</div>
		</div>
	)
}



export default CommonTopHeader;
