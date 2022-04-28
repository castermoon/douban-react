import React, { Component,Fragment } from "react"
import style from "./ratingPercent.styl"


class RatingPercent extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className={style.ratingContainer}>
				{
					this.StarLength.map((item,index) => {
						return <div className={style.item} key={index}>
							<div className={style.label}>{(-5 + index) * -1}星</div>
							<div className={style.line} style={{"width":item}}/>
							{
								this.ratingPercent[index] !==0 &&
								<div className={style.percent}>{(this.ratingPercent[index] * 50).toFixed(1) + "%"}</div>
							}
						</div>
					})
				}
			</div>
		)
	}

	get StarLength() {
		let fiveStarLen = Math.floor(this.props.commentScoreObj["10"] * 88) / 2 + 'px'
		let fourStarLen = Math.floor(this.props.commentScoreObj["8"] * 88) / 2 + 'px'
		let threeStarLen = Math.floor(this.props.commentScoreObj["6"] * 88) / 2 + 'px'
		let twoStarLen = Math.floor(this.props.commentScoreObj["4"] * 88) / 2 + 'px'
		let oneStarLen = Math.floor(this.props.commentScoreObj["2"] * 88) / 2 + 'px'
		return [fiveStarLen, fourStarLen, threeStarLen, twoStarLen, oneStarLen]
	}
	get ratingPercent(){
		return[this.props.commentScoreObj["10"],this.props.commentScoreObj["8"],this.props.commentScoreObj["6"],this.props.commentScoreObj["4"],this.props.commentScoreObj["2"]]
	}

}

export default RatingPercent;
