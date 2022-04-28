import React, {Component} from "react"
import style from "./commonTopHeader.styl"

class CommonTopHeader extends Component {
	render() {
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
}

export default CommonTopHeader;
