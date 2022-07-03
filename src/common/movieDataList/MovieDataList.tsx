import React from "react"

import style from "./movieDataList.styl"
import {Link } from "react-router-dom"
import Star from "../../common/star/Star";


interface movieDatatype{
    id:number;
    name:string;
    cover:string;
    type:string;
    country:string;
    language:string;
    time:string;
    timeLen:number;
    score:number;
    anotherName?:string;
    indbLink?: string,
    brief?:string;
    web?:string;
}

interface PropsType{
    movieContentData: movieDatatype[]
}

const SubjectSearch:React.FC<PropsType> = (props) => {
    const { movieContentData } = props




    return(
        <ul className={style.searchList}>
            {
                movieContentData.length > 0 && movieContentData.map(item => {
                    return 	<li className={style.searchItem} key={item.id}>
                        <div className={style.searchItemLeft}>
                            <img src={item.cover}/>
                        </div>
                        <div className={style.searchItemRight}>
                            <Link to={"/detail/"+item.id} className={style.movieName}>{item.name}</Link>
                            <div className={style.date}></div>
                            <p className={style.movieDesc}>{item.time && timeFormatChange(item.time)} / {item.country} / {item.type} / {item.timeLen}分钟</p>
                            <div className={style.starWrapper}><Star score={item.score}/></div>
                            <span className={style.score}>{item.score}</span>
                        </div>
                    </li>
                })
            }
        </ul>
    )

    function timeFormatChange(time:string){
        return time.substring(0,10)
    }
}


export default SubjectSearch;
