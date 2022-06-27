import style from "./pagination.styl"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface PropsType{
	pageName:string;
}

const Pagination:React.FC<PropsType> = (props) => {
	const params = useParams()
	const { page,movie_id,commentType ="" } = params
	const navigate = useNavigate()
	const [pageList, setPageList] = useState([1,2,3,4,5,6,7,8,9,'...']);
	const [currentPage, setCurrentPage] = useState<number|string>(Number(page));

	useEffect(() => {
		changePage(pageList,currentPage)
	},[currentPage])

	const { pageName } = props
	return(
		<div className={style.pagination}>
			<div className={[style.prev,currentPage > 1 ? style.isActive: ""].join(" ")} onClick={prevPageClick}>《前页</div>
			<ul className={style.pageList}>
				{
					pageList.length > 0 && pageList.map((item,index) => {
						return <li className={[style.pageListItem,(index+1) === currentPage ? style.isActive : ""].join(" ")}
											 onClick={() => {pageListClick(item)}}
											 key={index}>
										{item}
						</li>
					})
				}
			</ul>
			<div className={[style.next, style.isActive].join(" ")} onClick={nextPageClick}>后页》</div>
		</div>
	)
	function pageListClick(pagination:(number|string)){
		if(currentPage === pagination  || pagination === "..."){
			return
		}
		setCurrentPage(pagination)
	}

	function nextPageClick(){
		if(typeof currentPage === "number"){
			setCurrentPage(currentPage + 1)
		}
	}

	function prevPageClick(){
		if(currentPage <= 1){
			return
		}
		if(typeof currentPage === "number"){
			setCurrentPage(currentPage - 1)
		}
	}

	function changePage(pageList:(string|number)[],currentPage:(string|number)){
		if(typeof currentPage === "string"){
			return
		}
		let clonePageList = [...pageList]
		if(currentPage <= 5){
			clonePageList = [1,2,3,4,5,6,7,8,9,'...']
		}else if(currentPage > 5 && currentPage <= 9 && clonePageList.length <= 15){
			let count = currentPage - 5
			clonePageList.pop()
			for(let i = 0;i < count;i++){
				// @ts-ignore
				clonePageList.push(clonePageList[clonePageList.length-1] + 1)
			}
			clonePageList.push('...')
		}else if(currentPage > 9 ){
			let start = currentPage - 4
			clonePageList = [1,2,'...']
			for(let j = 0;j < 9;j++){
				clonePageList.push(start)
				start = start + 1
			}
		}
		setPageList(clonePageList)
		navigate(`/${pageName}/${movie_id}/${currentPage}/${commentType}`)
	}
}



Pagination.defaultProps = {
	pageName:""
}

export default Pagination
