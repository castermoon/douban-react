import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import BannerSwiper from "./components/bannerSwiper/BannerSwiper";
import style from "./home.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import { Link } from "react-router-dom"
import PhotoList from "./components/photoList/PhotoList";
import axios from "axios"
import HotRecommend from "./components/hotRecommend/HotRecommend";
import PopularComments from "./components/popularComments/PopularComments";

interface weekendListItem{
	name:string,
	id:number
}

const Home:React.FC = () => {
	const [data, setData] = useState({
		weekendList:[],
		PhotoList:[],
		popularCommentList:[]
	});

	//getHomeData
	useEffect(()=>{
		axios.get("/api/home")
			.then((res)=>{
				setData({
					weekendList:res.data.data.weekendList,
					PhotoList:res.data.data.PhotoList,
					popularCommentList:res.data.data.popularCommentList
				})
			})
	},[])

	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				left={
					<Fragment>
						<PhotoList PhotoList={data.PhotoList}/>
						<BannerSwiper title={'最近热门电影'} PhotoList={data.PhotoList} />
						<BannerSwiper title={'最近热门电视剧'} PhotoList={data.PhotoList} />
						<HotRecommend />
						<PopularComments popularCommentList={data.popularCommentList}/>
					</Fragment>
				}
				right={
					<Fragment>
						<div className={style.weekendList}>
							<div className={style.weekendListHeader}>
								<a href="#">豆瓣电影评分八问</a>
							</div>
							<div className={style.listTitle}>
								<span className={style.listTitleFirst}>一周口碑榜</span>
								<span className={style.listTitleSecond}>更多榜单»</span>
							</div>
							<ul className={style.list}>
								{
									data.weekendList.map((item:weekendListItem,index) => {
										return <Link key={item.id} to={`detail/${item.id}`}><li  className={style.listItem} ><span className={style.num}>{index+1}&nbsp;</span>{item.name}</li></Link>
									})
								}
							</ul>
						</div>
						<div className={style.douList}>
							<h2 className={style.douListTitle}>热门豆列</h2>
							<ul>
								<li className={style.douListItem}>英国历史</li>
								<li className={style.douListItem}>黑暗系日影日剧，专治各种鸡汤病</li>
							</ul>
						</div>
					</Fragment>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)
}




export default Home;
