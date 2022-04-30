import React, { Component,Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import BannerSwiper from "./components/bannerSwiper/BannerSwiper";
import style from "./home.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import PhotoList from "./components/photoList/PhotoList";
import axios from "axios"
const Home = () => {
	const [data, setData] = useState({
		weekendList:[],
		PhotoList:[]
	});

	//getHomeData
	useEffect(()=>{
		axios.get("/api/home")
			.then((res)=>{
				setData({
					weekendList:res.data.data.weekendList,
					PhotoList:res.data.data.PhotoList
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
						<BannerSwiper PhotoList={data.PhotoList}/>
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
									data.weekendList.map((item,index) => {
										return <li className={style.listItem} key={item.id}><span className={style.num}>{index+1}&nbsp;</span>{item.name}</li>
									})
								}
							</ul>
						</div>
						<div className={style.douList}>
							<h2 className={style.douListTitle}>热门豆列</h2>
							<ul>
								<li className={style.douListItem}>MOViE木卫：你不应该错过的100部韩国电影</li>
								<li className={style.douListItem}>MOViE木卫：你不应该错过的100部韩国电影</li>
							</ul>
						</div>
					</Fragment>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)
}
// class Home extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state={
// 			PhotoList:[],
// 			weekendList:[]
// 		}
// 	}
// 	componentDidMount(){
// 		axios.get('/api/home')
// 			.then((res) => {
// 				if(res.data.errno == 0){
// 					this.setState((prevState) => {
// 						return {
// 							PhotoList:res.data.data.PhotoList,
// 							weekendList:res.data.data.weekendList
// 						}
// 					})
// 				}
// 			})
// 			.catch(function (error){
// 				console.log(error)
// 		})
// 	}
// 	render() {
// 		return(
// 			<Fragment>
// 				<CommonHeader />
// 				<BaseBody
// 					left={
// 						<Fragment>
// 							<PhotoList PhotoList={this.state.PhotoList}/>
// 							<BannerSwiper PhotoList={this.state.PhotoList}/>
// 						</Fragment>
// 					}
// 					right={
// 						<Fragment>
// 							<div className={style.weekendList}>
// 								<div className={style.weekendListHeader}>
// 									<a href="#">豆瓣电影评分八问</a>
// 								</div>
// 								<div className={style.listTitle}>
// 									<span className={style.listTitleFirst}>一周口碑榜</span>
// 									<span className={style.listTitleSecond}>更多榜单»</span>
// 								</div>
// 								<ul className={style.list}>
// 									{
// 										this.state.weekendList.map((item,index) => {
// 											return <li className={style.listItem} key={item.id}><span className={style.num}>{index+1}&nbsp;</span>{item.name}</li>
// 										})
// 									}
// 								</ul>
// 							</div>
// 							<div className={style.douList}>
// 								<h2 className={style.douListTitle}>热门豆列</h2>
// 								<ul>
// 									<li className={style.douListItem}>MOViE木卫：你不应该错过的100部韩国电影</li>
// 									<li className={style.douListItem}>MOViE木卫：你不应该错过的100部韩国电影</li>
// 								</ul>
// 							</div>
// 						</Fragment>
// 					}
// 				/>
// 				<CommonFooter/>
// 			</Fragment>
// 		)
// 	}
// }

export default Home;
