import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./subjectSearch.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import {Link,useParams } from "react-router-dom"
import Star from "../../common/star/Star";


const SubjectSearch = () => {
	const params = useParams()
	const { searchContent, searchType } = params

	const [movieContentData, setMovieContentData] = useState([]);
	const [celebrityContentData, setCelebrityContentData] = useState([]);

	//getData
	useEffect(()=>{
		axios.get(`/api/subjectSearch/${searchContent}/${searchType}`)
			.then((res)=>{
				if (res.data.errno === 0 ) {
					if(res.data.searchType === "movies"){
						setMovieContentData(res.data.data)
						setCelebrityContentData([])
					}else{
						setCelebrityContentData(res.data.data)
						setMovieContentData([])
					}
				}
			})
	},[searchContent,searchType])

	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				title={`搜索 ${searchContent}`}
				left={
					<Fragment>
						<ul className={style.searchList}>
							{
								movieContentData.map(item => {
									return 	<li className={style.searchItem} key={item.id}>
										<div className={style.searchItemLeft}>
											<img src={item.cover}/>
										</div>
										<div className={style.searchItemRight}>
											<Link to={"/detail/"+item.id} className={style.movieName}>{item.name} ({item.time})</Link>
											<div className={style.starWrapper}><Star score={item.score}/></div>
											<span className={style.score}>{item.score}</span>
											<p className={style.movieDesc}>{item.country}/{item.type}/{item.name}//{item.timeLen}</p>
										</div>
									</li>
								})
							}
						</ul>
						<ul className={style.searchList}>
							{
								celebrityContentData.map(item => {
									return 	<li className={style.searchItem} key={item.id}>
										<div className={style.searchItemLeft}>
											<img src={item.icon}/>
										</div>
										<div className={style.searchItemRight}>
											<Link to={"/celebrity/"+item.id} className={style.celebrityName}>{item.name} ({item.time})</Link>
											<p className={style.movieDesc}>{item.vocation}/{item.birth}</p>
										</div>
									</li>
								})
							}
						</ul>
					</Fragment>
				}
				right={
					2
				}
			/>
			<CommonFooter/>
		</Fragment>
	)
}


export default SubjectSearch;
