import React, { Component,Fragment } from "react"
import style from "./photoList.styl"
import { Navigation, Pagination } from 'swiper';
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Star from "../../../../common/star/Star";

class PhotoList extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<Fragment>
				<div className={style.container}>
					<div className={style.title}>
						<span className={style.hot}>正在热映</span>
						<span className={style.allHot}>全部正在热映»</span>
						<span className={style.soon}>即将上映»</span>
					</div>
					<div className={style.photoContainer}>
						{this.getSwiper()}
					</div>
				</div>
			</Fragment>
		)
	}

	get pages() {
		let pages = []
		this.props.PhotoList.forEach((item,index)=>{
			let page = Math.floor(index / 5)
			if (!pages[page]){
				pages[page] = []
			}
			pages[page].push(item)
		})
		return pages
	}
	getSwiper(){
		return <Swiper
			modules={[Navigation, Pagination,]}
			navigation
			pagination={{ clickable: true }}
		>
			{
				this.pages.map((page,index) => {
					return <SwiperSlide key={index}>
						{ page.map((item) => {
							return <Link to={`/detail/+${item.id}`} className={style.item} key={item.id}>
							<div className={style.icon}><img src={item.cover}/></div>
								<div className={style.name}>{item.name}</div>
								<div className={style.starWrapper}><Star score={item.score}/><span className={style.score}>{item.score}</span></div>
								<div className={style.button}>选座购票</div>
							</Link>
						})}
						</SwiperSlide>
				})
			}
		</Swiper>
	}
}

export default PhotoList;
