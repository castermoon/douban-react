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

interface weekendListItemType{
	name:string,
	id:number
}

interface movieItemType{
	id: number,
	cover: string,
	name: string,
	score: number,
	type: string
}

interface commentType{
	longComment_id: number,
	title: string,
	content: string,
	score: number,
	movie_id: number,
	cover: string,
	movie_name: string,
	user_id: number,
	username: string
}

const Home:React.FC = () => {
	const [weekendList, setWeekendList] = useState<weekendListItemType[]>([]);
	const [isShowingMovieList, setIsShowingMovieList] = useState<movieItemType[]>([]);
	const [hotMovieList, setHotMovieList] = useState<movieItemType[]>([]);
	const [hotTVList, setHotTVList] = useState<movieItemType[]>([]);
	const [popularCommentList, setPopularCommentList] = useState<commentType[]>([]);

	const typeList = ["所有","中国","日本","美国","韩国"]
	//getHomeData
	useEffect(()=>{
		axios.get("/api/home")
			.then((res)=>{
				const data = res.data.data
				setWeekendList(data.weekendList)
				setHotMovieList(data.hotMovieList)
				setIsShowingMovieList(data.isShowingMovieList)
				setHotTVList(data.hotTVList)
				setPopularCommentList(data.popularCommentList)
			})
	},[])

	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				left={
					<Fragment>
						<PhotoList movieList={isShowingMovieList} />
						<BannerSwiper
							typeList={typeList}
							title={'最近热门电影'}
							movieList={hotMovieList}
							getMovieList={getMovieList}
							dataType={"hotMovie"}
						/>
						<BannerSwiper
							typeList={typeList}
							title={'最近热门电视剧'}
							movieList={hotTVList}
							getMovieList={getMovieList}
							dataType={"hotTV"}
						/>
						<HotRecommend />
						<PopularComments popularCommentList={popularCommentList}/>
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
									weekendList.map((item:weekendListItemType,index) => {
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

	function getMovieList(dataName:string,country:string):void{
		axios.post(`/api/home/getHomeMovieData`,{
			country:country
		}).then((res)=>{
				const data = res.data.data
				if(dataName === "hotMovie"){
					setHotMovieList(data.dataList)
				}else if(dataName === "hotTV"){
					setHotTVList(data.dataList)
				}
			})
	}
}




export default Home;
