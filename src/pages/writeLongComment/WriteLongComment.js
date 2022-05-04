import React,{useState} from "react"
import style from "./writeLongComment.styl"
import { Link, useParams,useNavigate  } from "react-router-dom"
import axios from "axios"
import store from "../../store";
const WriteLongComment = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { movie_id } = params

	const [commentTitle, setCommentTitle] = useState("")
	const [commentContent, setCommentContent] = useState("")
	const [userInfo, setUserInfo] = useState(store.getState())
	const [score, setScore] = useState(0)
	const [spoiler,setSpoiler] = useState(0)

	store.subscribe(()=>{
		setUserInfo(store.getState())
	})

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
					<div onClick={commentPublish}>发表</div>
				</div>
			</div>
			<div className={style.container}>
				<div className={style.score}>
					<label className={style.label}>给个评价吧(1-5):</label>
					<input className={style.scoreInput} type="number" onChange={scoreInputChange}/>
					<label className={style.label}>是否剧透:</label>
					<input type="checkbox" onChange={spoilerCheckBoxChange} value={1}/>
				</div>
				<textarea className={style.titleInput} maxLength="200" placeholder="添加标题" rows="1"
									style={{resize: "none",overflow: "hidden", height: "30px"}}
									onChange={titleInputChange}
				/>
				<textarea className={style.commentInput} placeholder="写评论..."
									onChange={contentInputChange}
				/>
			</div>
		</div>
	)

	function spoilerCheckBoxChange(e){
		e.stopPropagation()
		const target = e.target
		if(target.hasAttribute("checked")){
			target.removeAttribute("checked")
			setSpoiler(0)
		}else {
			target.setAttribute("checked",true)
			setSpoiler(1)
		}

		// e.target.setAttribute("checked")
		console.log(e.target.hasAttribute("checked"))
		// const value = e.target.value
		// setScore(value)
	}

	function scoreInputChange(e){
		e.stopPropagation()
		const value = e.target.value
		setScore(value)
	}

	function titleInputChange(e){
		e.stopPropagation()
		const value = e.target.value
		setCommentTitle(value)
	}

	function contentInputChange(e){
		e.stopPropagation()
		const value = e.target.value
		setCommentContent(value)
	}

	function commentPublish(){
		axios.post('/api/longComments/createLongComment',{
			movieId:movie_id,
			content:commentContent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '),
			score:parseInt(score) * 2,
			userId:userInfo.userInfo.id,
			title:commentTitle,
			spoiler:spoiler
		}).then((res)=>{
			console.log(res)
			alert("发表成功")
			navigate(`/detail/${movie_id}`)
		})
	}
}

export default WriteLongComment
