import React  from "react"

import style from "./bannerSwiper.styl"
import { Link } from "react-router-dom"
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Tip from "../../../../common/tip/Tip";


interface movieItem{
	cover:string,
	id:number,
	name:string,
	score:number
	type:string
}

interface propsType{
	movieList:movieItem[];
	title:string;
	getMovieList:(dataName: string, country: string) => void;
	typeList:string[];
	dataType:string;
}

const BannerSwiper:React.FC<propsType> = (props) => {
	const { movieList,title,getMovieList,typeList,dataType } = props
	const getSwiper =() => {
		return <Swiper
			modules={[Navigation, Pagination,]}
			navigation
			pagination={{ clickable: true }}
		>
			{
				pages(movieList).map((page,index) => {
					return <SwiperSlide key={index}>
						{ page.map((item) => {
							return <Link to={`/detail/${item.id}`} key={item.id} className={style.item}>
									<div className={style.item} key={item.id}>
										<div className={style.icon}><img src={item.cover}/></div>
										<div className={style.name}>{item.name}</div>
										<div className={style.tip_wrapper}>
											<Tip movieItem={item}/>
										</div>
									</div>
								</Link>
						})}
					</SwiperSlide>
				})
			}
		</Swiper>
	}

	const pages =(movieList:movieItem[]):movieItem[][] => {
		let pages:movieItem[][] = []
		movieList.forEach((item,index) =>{
			let page = Math.floor(index / 10)
			if (!pages[page]){
				pages[page] = []
			}
			pages[page].push(item)
		})
		return pages
	}
	return(
		<div className={style.container}>
			<div className={style.header}>
				<span className={style.title}>{ title }</span>
				<ul className={style.headerList}>
					{
						typeList.length > 0 && typeList.map((item,index) => {
							return <li
								className={style.headerListItem}
								key={index}
								onClick={() => {getMovieList(dataType,item)}}
							>{item}</li>
						})
					}
				</ul>
				<div className={style.more}>更多»</div>
			</div>
			<div className={style.bannerBody}>
					{getSwiper()}
			</div>
		</div>
	)
}


export default BannerSwiper;
