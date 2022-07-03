import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./subjectSearch.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import axios from "axios"
import {Link,useParams } from "react-router-dom"
import MovieDataList from "../../common/movieDataList/MovieDataList";


interface movieDatatype{
	id:number;
	name:string;
	cover:string;
	type:string;
	web?:string;
	country:string;
	language:string;
	time:string;
	timeLen:number;
	anotherName:string;
	indbLink?: string,
	brief:string;
	score:number;
}





interface celebrityDataType{
	id: number;
	name: string;
	icon: string;
	sex: number;
	constellation: string;
	birth: string;
	vocation: string;
	anotherName: string;
	anotherChineseName: string;
	indbLink: string;
	web: string;
	desc:string;
}

const SubjectSearch = () => {
	const params = useParams()
	const { searchContent, searchType } = params
	const [movieContentData, setMovieContentData] = useState<movieDatatype[]>([]);
	const [celebrityContentData, setCelebrityContentData] = useState<celebrityDataType[]>([]);

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
						<MovieDataList movieContentData={movieContentData}/>
						<ul className={style.searchList}>
							{
								celebrityContentData.length > 0 && celebrityContentData.map(item => {
									return 	<li className={style.searchItem} key={item.id}>
										<div className={style.searchItemLeft}>
											<img src={item.icon}/>
										</div>
										<div className={style.searchItemRight}>
											<Link to={"/celebrity/"+item.id} className={style.celebrityName}>{item.name}</Link>
											<p className={style.desc}>{item.vocation}/{item.birth}</p>
										</div>
									</li>
								})
							}
						</ul>
					</Fragment>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)

	function timeFormatChange(time:string){
		return time.substring(0,10)
	}
}


export default SubjectSearch;
