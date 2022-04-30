import {Link} from "react-router-dom"
import style from "./personalHeader.styl"
const PersonalHeader = () => {
	return(
		<div className={style.header}>
			<div className={style.nav}>
				<div className={style.imgWrapper}>
					<Link to="/">
						<img
							src="https://img3.doubanio.com/f/accounts/4fd84763a74089b20eb02ba0225d6e7739d2c432/passport/pics/douban_logo@2x.png"
							width="142"/>
					</Link>
				</div>
				<ul className={style.navList}>
					<li className={style.navItem}><a href="/home">首页</a></li>
					<li className={style.navItem}><a href="#">我的豆瓣</a></li>
					<li className={style.navItem}><a href="#">浏览发现</a></li>
					<li className={style.navItem}><a href="#">话题广场</a></li>
				</ul>
				<div className={style.search}>
					<input className={style.searchInput} placeholder="搜索你感兴趣的内容或人"/>
					<button className={style.searchButton}>搜</button>
				</div>
			</div>
		</div>
	)
}

export default PersonalHeader
