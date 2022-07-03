import React, { Fragment,useState, useEffect } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import style from "./home.styl"
import CommonFooter from "../../common/commonFooter/CommonFooter";
import { Link } from "react-router-dom"
import axios from "axios"
import CommonTitle from "../../common/commonTitle/CommonTitle";
import MovieDataList from "../../common/movieDataList/MovieDataList";



interface movieItemType{
    id: number,
    name: string,
    cover: string,
    type: string,
    country: string,
    language: string,
    time: string,
    timeLen: number,
    score: number
}


const MovieRank:React.FC = () => {
    const [movieRankList, setMovieRankList] = useState<movieItemType[]>([]);

    //getHomeData
    useEffect(()=>{
        axios.get("/api/movieRank")
            .then((res)=>{
                const data = res.data.data
                setMovieRankList(data.movieRankList)
            })
    },[])

    return(
        <Fragment>
            <CommonHeader />
            <BaseBody
                title={"豆瓣电影排行榜"}
                left={
                    <Fragment>
                        <CommonTitle title={"豆瓣新片榜"}/>
                        <MovieDataList movieContentData={movieRankList}/>
                    </Fragment>
                }
            />
            <CommonFooter/>
        </Fragment>
    )


}




export default MovieRank;
