import React, { Component } from "react"
import PropTypes from "prop-types"

import style from "./bannerSwiper.styl"
import { Link } from "react-router-dom"
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSwiper = (props) => {
	const { PhotoList } = props

	const getSwiper =() => {
		return <Swiper
			modules={[Navigation, Pagination,]}
			navigation
			pagination={{ clickable: true }}
		>
			{
				pages(PhotoList).map((page,index) => {
					return <SwiperSlide key={index}>
						{ page.map((item) => {
							return <Link to={`/detail/${item.id}`} key={item.id} className={style.item}>
									<div className={style.item} key={item.id}>
										<div className={style.icon}><img src={item.cover}/></div>
										<div className={style.name}>{item.name}</div>
									</div>
								</Link>
						})}
					</SwiperSlide>
				})
			}
		</Swiper>
	}

	const pages =(PhotoList) => {
		let pages = []
		PhotoList.forEach((item,index)=>{
			let page = Math.floor(index / 10)
			if (!pages[page]){
				pages[page] = []
			}
			pages[page].push(item)
		})
		return pages
	}
	return(
		<div className={style.bannerContainer}>
			<div className={style.header}>
				<span className={style.title}>最近热门电影</span>
				<ul className={style.headerList}>
					<li className={style.headerListItem}>热门</li>
					<li className={style.headerListItem}>最新</li>
					<li className={style.headerListItem}>豆瓣高分</li>
					<li className={style.headerListItem}>冷门佳片</li>
					<li className={style.headerListItem}>华语</li>
					<li className={style.headerListItem}>欧美</li>
					<li className={style.headerListItem}>韩国</li>
					<li className={style.headerListItem}>日本</li>
				</ul>
				<div className={style.more}>更多»</div>
			</div>
			<div className={style.bannerBody}>
					{getSwiper()}
			</div>
		</div>
	)
}
//类型检查
BannerSwiper.propTypes = {
	PhotoList :PropTypes.array,
}

BannerSwiper.defaultProps = {
	commentScoreObj : []
}


export default BannerSwiper;
