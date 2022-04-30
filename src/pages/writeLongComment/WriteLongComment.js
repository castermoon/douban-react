import React from "react"
import style from "./writeLongComment.styl"
import { Link } from "react-router-dom"
const WriteLongComment = () => {
	return(
		<div>
			<div className={style.nav}>
				<div className={style.navInner}>
					<div className={style.navLogo}>
						<Link className={style.navLogoText} to="/">豆瓣</Link>
					</div>
					<h1 className={style.navLabel}>写评论</h1>
				</div>
				<div className={style.navRight}>
					<div>发表</div>
				</div>
			</div>
			<div className={style.container}>
				<div className={style.score}>
					<label className={style.label}>给个评价吧(1-5):</label><input className={style.scoreInput} type="number"/>
					<label className={style.label}>是否剧透:</label><input type="checkbox"/>
				</div>
				<textarea className={style.titleInput} maxLength="200" placeholder="添加标题" rows="1"
									style={{resize: "none",overflow: "hidden", height: "30px"}}></textarea>
				<textarea className={style.commentInput} placeholder="写评论..."></textarea>
			</div>
		</div>
	)
}

export default WriteLongComment
