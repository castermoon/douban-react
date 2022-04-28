import React, {Component} from "react"
import style from "./star.styl"

class Star extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={style.star}>
				{
					this.itemClasses.map((item,index) =>{
						return <div className={[style.starItem,style[item]].join(" ")} key={index}></div>
					})
				}
			</div>
		)
	}
	get itemClasses(){
		let arr = []
		let score = this.props.score / 2
		let onStar = Math.floor(score)
		let halfStar = 0
		if(score - onStar >= 0.5){
			halfStar = 1
		}
		let offStar = 5 - onStar - halfStar
		for(let i = 0;i<onStar;i++){
			arr.push('on')
		}
		if(halfStar === 1){
			arr.push('half')
		}
		for(let j = 0;j<offStar;j++){
			arr.push('off')
		}
		return arr
	}
}

export default Star;
