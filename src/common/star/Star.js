import React, {Component} from "react"
import style from "./star.styl"
import PropTypes from "prop-types"

const Star = (props) => {
	const { score } = props
	return (
		<div className={style.star}>
			{
				itemClasses(score).map((item,index) =>{
					return <div className={[style.starItem,style[item]].join(" ")} key={index}/>
				})
			}
		</div>
	)

	function itemClasses(score){
		let arr = []
		score = score / 2
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

//类型检查
Star.propTypes = {
	score :PropTypes.number,
}

Star.defaultProps = {
	score :0,
}

export default Star;
