import React, { useState,Fragment } from "react"
import CommonTopHeader from "../commonTopHeader/CommonTopHeader";
import style from "./commonHeader.styl"
import { Link, useNavigate, useParams } from "react-router-dom"
const CommonHeader = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { searchContent, searchType } = params
	const [currentSearchContent, setCurrentSearchContent] = useState();
	const [currentSearchType, setCurrentSearchType] = useState("movies");


	return(
		<Fragment>
			<CommonTopHeader/>
			<div className={style.header}>
				<div className={style.body}>
					<div className={style.headerBorderLine}/>
					<div className={style.headerBodyTop}>
						<Link to="/" className={style.title}>豆瓣电影</Link>
						<div className={style.searchContainer}>
							<select className={style.select} onChange={searchTypeChange}>
								<option value="movies">电影</option>
								<option value="celebritys">人物</option>
							</select>
							<input
								className={style.searchInput}
								placeholder="搜索电影、人物"
								onChange={searchContentChange}
							/>
							<button className={style.searchButton} onClick={handleSearch}/>
						</div>
					</div>
					<ul className={style.headerBodyBottom}>
						<li className={style.headerBodyLink}>影讯&购票</li>
						<li className={style.headerBodyLink}>选电影</li>
						<li className={style.headerBodyLink}>电视剧</li>
						<li className={style.headerBodyLink}>排行榜 </li>
						<li className={style.headerBodyLink}>分类 </li>
						<li className={style.headerBodyLink}>影评</li>
						<li className={style.headerBodyLink}>2019年度榜单 </li>
						<li className={style.headerBodyLink}>2019书影音报告</li>
					</ul>
					<div className={style.headerLogo}/>
				</div>
			</div>
		</Fragment>
	)

	function searchTypeChange(e){
		const value = e.target.value
		setCurrentSearchType(value)
	}

	function searchContentChange(e){
		const value = e.target.value
		setCurrentSearchContent(value)
	}

	function handleSearch(){
		if(!currentSearchContent){
			alert("请输入搜索内容")
			return
		}
		if(searchContent === currentSearchContent && searchType === currentSearchType){
			return
		}
		navigate(`/subjectSearch/${currentSearchContent}/${currentSearchType}`)
	}

}


export default CommonHeader;
