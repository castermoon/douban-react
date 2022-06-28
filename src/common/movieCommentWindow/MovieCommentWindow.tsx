import React,{useState} from "react"
import style from "./movieCommentWindow.styl"
import axios from "axios"

interface PropsType{
	WindowIsShow:Boolean;
	closeWindow:() => void;
	movie_id:number;
}

interface labelItemType{
	name:string;
	status:boolean;
}


const MovieCommentWindow:React.FC<PropsType> = (props) => {
	const myLabelList:labelItemType[] = setLabelInitialState(["悬疑","推理","治愈","推的","大萨达","啊啊啊","抖动","zz","学习","dd","打得"]);
	const usedLabelList:labelItemType[] = setLabelInitialState(["悬疑","推理","警匪"]);
	const [ myLabelStatusList, setMyLabelStatusList] = useState(myLabelList)
	const [ usedLabelStatusList, setUsedLabelStatusList] = useState(usedLabelList)
	const [ labelInput, setLabelInput] = useState("")
	const [ scoreInput, setScoreInput] = useState(0)
	const [ shortCommentContentInput, setShortCommentContentInput] = useState("")
	const [ onlyMe, setOnlyMe] = useState(false)
	const [ status, setStatus] = useState(true)
	const [ isShare, setIsShare] = useState(false)



	const { WindowIsShow,closeWindow,movie_id } = props
	return(
		WindowIsShow &&
		<div className={style.movieCommentWindow}>
			<div className={style.windowHeader}>
				<span>添加收藏：写短评</span>
				<div className={style.close} onClick={closeWindow}>关闭</div>
			</div>
			<div className={style.windowBody}>
				<div className={style.windowCheckboxList}>
					<div onChange={handleStatusInputChange} style={{display:"inline-block"}}>
						<div className={style.windowCheckboxItem}><input type="radio" value="看过" name="isLooked" />看过</div>
						<div className={style.windowCheckboxItem}><input type="radio" value="想看" name="isLooked" />想看</div>
					</div>
					{
						status  &&
						<div className={style.scoreInputWrapper}>评分(1-5)
							<input className={style.scoreInput}  type="number" step="1" min="1" max="5"
										 onChange={handleScoreInputChange}
										 value={scoreInput}
							/>
						</div>
					}
				</div>
				<div>标签(多个标签用空格分隔):</div>
				<input
					className={style.labelInput}
					onChange={handleLabelInputChange}
					value={labelInput}
				/>
				<div className={style.windowLabel}>
					<div className={style.windowLabelLeft}>我的标签:</div>
					<div className={style.windowLabelList}>
						{
							myLabelStatusList.length > 0 && myLabelStatusList.map((item,index)=>{
								return <span className={[style.windowLabelItem,item.status ? style.isActive : ""].join(" ")} key={index} onClick={()=>AddLabel(item)}>{item.name}</span>
							})
						}
					</div>
				</div>
				<div className={style.windowLabel}>
					<div className={style.windowLabelLeft}>常用标签:</div>
					<div className={style.windowLabelList}>
						{
							usedLabelStatusList.length > 0 && usedLabelStatusList.map((item,index)=>{
								return <span className={[style.windowLabelItem,item.status ? style.isActive : ""].join(" ")} key={index} onClick={()=>AddLabel(item)}>{item.name}</span>
							})
						}
					</div>
				</div>
				<div>简短评论:</div>
				<textarea
					className={style.shortCommentInput}
					onChange={handleShortCommentContentChange}
					value={shortCommentContentInput}
				/>
				<div className={style.onlyMe}><input type="checkbox" onChange={handleOnlyMeInputChange} checked={onlyMe}/>仅自己可见</div>
			</div>
			<div className={style.windowFooter}>
				<input
					type="checkbox"
					checked={isShare}
					onChange={handleIsShareInputChange}
				/>
				<div className={style.share}>分享到我的广播</div>
				<div className={style.save} onClick={  saveShortComment}>保存</div>
			</div>
		</div>
	)


	function handleLabelInputChange(e:any){
		const value = e.target.value
		setLabelInput(value)
	}

	function handleScoreInputChange(e:any){
		e.stopPropagation()
		const value = parseInt(e.target.value)
		setScoreInput(value)
	}

	function handleShortCommentContentChange(e:any){
		const value = e.target.value
		setShortCommentContentInput(value)
	}

	function handleOnlyMeInputChange(){
		setOnlyMe(!onlyMe)
	}

	function handleIsShareInputChange(){
		setIsShare(!isShare)
	}

	function handleStatusInputChange(e:any){
		const value = e.target.value
		if(value === "想看"){
			setStatus(false)
		}else {
			setStatus(true)
		}
	}

	function AddLabel(labelItem:labelItemType){
		const cloneMyLabelStatusList = JSON.parse(JSON.stringify(myLabelStatusList))
		const cloneUsedLabelStatusList = JSON.parse(JSON.stringify(usedLabelStatusList))
		cloneMyLabelStatusList.map((item:labelItemType) => {
			if(item.name === labelItem.name){
				item.status = !item.status
			}
		})
		cloneUsedLabelStatusList.map((item:labelItemType) => {
			if(item.name === labelItem.name){
				item.status = !item.status
			}
		})
		setMyLabelStatusList(cloneMyLabelStatusList)
		setUsedLabelStatusList(cloneUsedLabelStatusList)
		if(labelInput.includes(" "+ labelItem.name)){
			setLabelInput(labelInput.replace(" "+ labelItem.name,""))
		}else {
			setLabelInput(labelInput +" "+ labelItem.name)
		}
	}

	function saveShortComment(){
		axios.post('/api/comments/createComment',{
			movieId:movie_id,
			content:shortCommentContentInput,
			score:scoreInput * 2,
			status:status,
			labelList:"",
			onlyMe:onlyMe,
			isShare:isShare
		})
			.then(function (res){
				const data = res.data
				if(data.errno === 0){
					alert("保存成功")
				}else if(data.errno === 10002){
					alert("未登录")
				}
			})
			.catch(function (err){
				console.log(err)
			})
		closeWindow()
	}

	function setLabelInitialState(labelList:string[]){
	  return labelList.map((item) => {
			return {name:item,status:false}
		})
	}
}


MovieCommentWindow.defaultProps = {
	WindowIsShow :false
}


export default MovieCommentWindow
