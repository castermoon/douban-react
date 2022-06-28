import React,{useState} from "react"
import style from "./writeLongComment.styl"
import { Link, useParams,useNavigate  } from "react-router-dom"
import axios from "axios"

interface userInfoType{
	id: number;
	username: string;
	password: string;
	nickname: string;
}

const WriteLongComment:React.FC = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { movie_id } = params

	const [commentTitle, setCommentTitle] = useState("")
	const [commentContent, setCommentContent] = useState("")
	const [score, setScore] = useState(0)
	const [spoiler,setSpoiler] = useState(false)


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
					<input type="checkbox" onChange={spoilerCheckBoxChange} checked={spoiler}/>
				</div>
				<textarea  className={style.titleInput} maxLength={200} placeholder="添加标题" rows={1}
									style={{resize: "none",overflow: "hidden", height: "30px"}}
									onChange={titleInputChange}
				/>
				<textarea className={style.commentInput} placeholder="写评论..."
									onChange={contentInputChange}
				/>
			</div>
		</div>
	)

	function spoilerCheckBoxChange(e:any){
		e.stopPropagation()
		setSpoiler(!spoiler)
	}

	function scoreInputChange(e:any){
		e.stopPropagation()
		const value = parseInt(e.target.value)
		setScore(value)
	}

	function titleInputChange(e:any){
		e.stopPropagation()
		const value = e.target.value
		setCommentTitle(value)
	}

	function contentInputChange(e:any){
		e.stopPropagation()
		const value = e.target.value
		setCommentContent(value)
	}

	function commentPublish(){
		axios.post('/api/longComments/createLongComment',{
			movieId:movie_id,
			content:commentContent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '),
			score:score,
			title:commentTitle,
			spoiler:spoiler
		}).then((res)=>{
			const data = res.data
			if(data.errno === 0){
				alert("发表成功")
				navigate(`/detail/${movie_id}`)
			}else if(data.errno === 10002){
				alert("未登录")
				navigate(`/login`)
			}
		})
	}
}

export default WriteLongComment
