import React,{useState} from "react"
import style from "./movieCommentWindow.styl"

const MovieCommentWindow = (props) => {
	const myLabelList = setLabelInitialState(["悬疑","推理","治愈","推的","大萨达","啊啊啊","抖动","zz","学习","dd","打得"]);
	const usedLabelList = setLabelInitialState(["悬疑","推理","警匪"]);
	const [ myLabelStatusList, setMyLabelStatusList] = useState(myLabelList)
	const [ usedLabelStatusList, setUsedLabelStatusList] = useState(usedLabelList)
	const [ labelInput, setLabelInput] = useState("")
	const [ scoreInput, setScoreInput] = useState("off")
	const [ shortCommentContentInput, setShortCommentContentInput] = useState("")
	const [ onlyMeInput, setOnlyMeInput] = useState("off")
	const [ isShareInput, setIsShareInput] = useState("on")
	const [ statusInput, setStatusInput] = useState("on")

	const { WindowIsShow,closeWindow } = props
	return(
		WindowIsShow &&
		<div className={style.movieCommentWindow}>
			<div className={style.windowHeader}>
				<span>添加收藏：写短评</span>
				<div className={style.close} onClick={closeWindow}>关闭</div>
			</div>
			<div className={style.windowBody}>
				<div className={style.windowCheckboxList}>
					<div className={style.windowCheckboxItem}><input type="radio" value="1" name="isLooked"/>看过</div>
					<div className={style.windowCheckboxItem}><input type="radio" value="0" name="isLooked"/>想看</div>
					<div className={style.scoreInputWrapper}>评分(1-5)
						<input className={style.scoreInput}  type="number" step="1" min="1" max="5"
									 onChange={handleScoreInputChange}
									 value={scoreInput}
						/>
					</div>
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
							myLabelStatusList.map((item,index)=>{
								return <span className={[style.windowLabelItem,item.status ? style.isActive : ""].join(" ")} key={index} onClick={()=>AddLabel(item)}>{item.name}</span>
							})
						}
					</div>
				</div>
				<div className={style.windowLabel}>
					<div className={style.windowLabelLeft}>常用标签:</div>
					<div className={style.windowLabelList}>
						{
							usedLabelStatusList.map((item,index)=>{
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
				<div className={style.onlyMe}><input type="checkbox" onChange={handleOnlyMeInputChange} value={onlyMeInput}/>仅自己可见</div>
			</div>
			<div className={style.windowFooter}>
				<input
					type="checkbox"
					onChange={handleIsShareInputChange}
				/>
				<div className={style.share}>分享到我的广播</div>
				<div className={style.save} onClick={saveShortComment}>保存</div>
			</div>
		</div>
	)


	function handleLabelInputChange(e){
		const value = e.target.value
		setLabelInput(value)
	}

	function handleScoreInputChange(e){
		const value = e.target.value
		setScoreInput(value)
	}

	function handleShortCommentContentChange(e){
		const value = e.target.value
		setShortCommentContentInput(value)
	}

	function handleOnlyMeInputChange(e){
		console.log(e.target.value)
		const value = e.target.value
		setOnlyMeInput(value)
	}

	function handleIsShareInputChange(e){
		console.log(e.target.hasAttribute("checked"))
		// const value = e.target.value === "off" ? "on":"off"
		// setIsShareInput(value)
	}

	function handleStatusInputChange(e){
		const value = e.target.value
		setStatusInput(value)
	}

	function AddLabel(labelItem){
		const cloneMyLabelStatusList = JSON.parse(JSON.stringify(myLabelStatusList))
		const cloneUsedLabelStatusList = JSON.parse(JSON.stringify(usedLabelStatusList))
		cloneMyLabelStatusList.map((item) => {
			if(item.name === labelItem.name){
				item.status = !item.status
			}
		})
		cloneUsedLabelStatusList.map((item) => {
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

	}

	function setLabelInitialState(labelList){
	  return labelList.map((item) => {
			return {name:item,status:false}
		})
	}
}

export default MovieCommentWindow
