import React from "react"
import style from "./ratingPercent.styl"

interface commentScoreObjType{
	2:string;
	4:string;
	6:string;
	8:string;
	10:string;
}


interface PropsType{
	commentScoreObj:commentScoreObjType
}

const RatingPercent:React.FC<PropsType> = (props) => {
	const { commentScoreObj } = props
	const StarLengthRes = StarLength(commentScoreObj)
	const ratingPercentRes = aRatingPercent(commentScoreObj)
	return(
		<div className={style.ratingContainer}>
			{
				StarLengthRes.length > 0 && StarLengthRes.map((item,index) => {
					return <div className={style.item} key={index}>
						<div className={style.label}>{(-5 + index) * -1}星</div>
						<div className={style.line} style={{"width":item}}/>
						{
							<div className={style.percent}>{(parseFloat(ratingPercentRes[index]) * 50).toFixed(1) + "%"}</div>
						}
					</div>
				})
			}
		</div>
	)

	function aRatingPercent(commentScoreObj:commentScoreObjType){
		return[commentScoreObj["10"],commentScoreObj["8"],commentScoreObj["6"],commentScoreObj["4"],commentScoreObj["2"]]
	}

	function StarLength(commentScoreObj:commentScoreObjType) {
		return [
			Math.floor(parseFloat(commentScoreObj["10"]) * 88) / 2 + 'px',
			Math.floor(parseFloat(commentScoreObj["8"]) * 88) / 2 + 'px',
			Math.floor(parseFloat(commentScoreObj["6"]) * 88) / 2 + 'px',
			Math.floor(parseFloat(commentScoreObj["4"]) * 88) / 2 + 'px',
			Math.floor(parseFloat(commentScoreObj["2"]) * 88) / 2 + 'px'
		]
	}
}



// class RatingPercent extends Component{
// 	constructor(props) {
// 		super(props);
// 	}
// 	render() {
// 		return(
// 			<div className={style.ratingContainer}>
// 				{
// 					this.StarLength.map((item,index) => {
// 						return <div className={style.item} key={index}>
// 							<div className={style.label}>{(-5 + index) * -1}星</div>
// 							<div className={style.line} style={{"width":item}}/>
// 							{
// 								this.ratingPercent[index] !==0 &&
// 								<div className={style.percent}>{(this.ratingPercent[index] * 50).toFixed(1) + "%"}</div>
// 							}
// 						</div>
// 					})
// 				}
// 			</div>
// 		)
// 	}
//
// 	get StarLength() {
// 		let fiveStarLen = Math.floor(this.props.commentScoreObj["10"] * 88) / 2 + 'px'
// 		let fourStarLen = Math.floor(this.props.commentScoreObj["8"] * 88) / 2 + 'px'
// 		let threeStarLen = Math.floor(this.props.commentScoreObj["6"] * 88) / 2 + 'px'
// 		let twoStarLen = Math.floor(this.props.commentScoreObj["4"] * 88) / 2 + 'px'
// 		let oneStarLen = Math.floor(this.props.commentScoreObj["2"] * 88) / 2 + 'px'
// 		return [fiveStarLen, fourStarLen, threeStarLen, twoStarLen, oneStarLen]
// 	}
//
// 	get ratingPercent(){
// 		return[this.props.commentScoreObj["10"],this.props.commentScoreObj["8"],this.props.commentScoreObj["6"],this.props.commentScoreObj["4"],this.props.commentScoreObj["2"]]
// 	}
// }



RatingPercent.defaultProps = {
	commentScoreObj : {} as commentScoreObjType
}


export default RatingPercent;
