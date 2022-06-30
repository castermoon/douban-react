import React, { Fragment,useEffect,useState } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import CommonFooter from "../../common/commonFooter/CommonFooter";
import style from "./management.styl"
import axios from "axios"

import CommonTitle from "../../common/commonTitle/CommonTitle";

interface MovieDataType{
    id:number;
    name:string;
    cover:string;
    type:string;
    web:string;
    country:string;
    language:string;
    timeLen:number;
    anotherName:string;
    score:number;
    brief:string;
    time:string;
}

const Management:React.FC = () => {
    const [movieName,setMovieName] = useState("")
    const [cover,setCover] = useState("")
    const [type,setType] = useState("")
    const [web,setWeb ]= useState("")
    const [country,setCountry] = useState("")
    const [language,setLanguage] = useState("")
    const [timeLen,setTimeLen] = useState(0)
    const [anotherName,setAnotherName] = useState("")
    const [score,setScore] = useState(0)
    const [brief,setBrief] = useState("")
    const [time,setTime] = useState("")
    const [movieData,setMovieData] = useState<MovieDataType[]>([])
    const [num,setNum] = useState(0)  //num用来控制删除数据后hook自动获取数据
    useEffect(() => {
        axios.get("/api/management/getMovieList")
            .then((res) => {
                setMovieData(res.data.data.movieList)
            })
    },[num])

    const movieDataThList = ["名字","封面","类型","官网","国家","语言","时长","别名","评分","简介","上映日期"]

    return(
        <Fragment>
            <CommonHeader />
                <BaseBody
                    left={
                        <Fragment>
                            <CommonTitle title={"添加电影"}/>
                            {
                                getMovieTable()
                            }
                            <form>
                                <label>名字：</label><div className={style.input_wrapper}><input type="text" value={movieName} onChange={nameChange}/></div>
                                <label>封面：</label><div className={style.input_wrapper}><input type="text" value={cover} onChange={coverChange}/></div>
                                <label>类型：</label><div className={style.input_wrapper}><input type="text" value={type} onChange={typeChange}/></div>
                                <label>官网：</label><div className={style.input_wrapper}><input type="text" value={web} onChange={webChange}/></div>
                                <label>国家：</label><div className={style.input_wrapper}><input type="text" value={country} onChange={countryChange}/></div>
                                <label>语言：</label> <div className={style.input_wrapper}><input type="text" value={language} onChange={languageChange}/></div>
                                <label>时长：</label><div className={style.input_wrapper}><input type="number" value={timeLen} onChange={timeLenChange}/></div>
                                <label>别名：</label><div className={style.input_wrapper}><input type="text" value={anotherName} onChange={anotherNameChange}/></div>
                                <label>评分：</label><div className={style.input_wrapper}><input type="number" value={score} onChange={scoreChange}/></div>
                                <label>简介：</label><div className={style.input_wrapper}><input type="text" value={brief} onChange={briefChange}/></div>
                                <label>上映日期：</label> <div className={style.input_wrapper}><input type="date" value={time} onChange={timeChange}/></div>
                            </form>
                            <button className={style.btn} onClick={addMovie}>提交</button>
                        </Fragment>
                    }
                />

            <CommonFooter/>
        </Fragment>
    )


    function nameChange(e:any){
        const value = e.target.value
        setMovieName(value)
    }
    function coverChange(e:any){
        const value = e.target.value
        setCover(value)
    }
    function typeChange(e:any){
        const value = e.target.value
        setType(value)
    }
    function timeLenChange(e:any){
        const value = e.target.value
        setTimeLen(value)
    }
    function anotherNameChange(e:any){
        const value = e.target.value
        setAnotherName(value)
    }
    function scoreChange(e:any){
        const value = e.target.value
        setScore(value)
    }
    function webChange(e:any){
        const value = e.target.value
        setWeb(value)
    }
    function countryChange(e:any){
        const value = e.target.value
        setCountry(value)
    }
    function languageChange(e:any){
        const value = e.target.value
        setLanguage(value)
    }
    function briefChange(e:any){
        const value = e.target.value
        setBrief(value)
    }
    function timeChange(e:any){
        const value = e.target.value
        setTime(value)
    }

    function getMovieTable(){
        return (<table>
            <thead>
                <tr>
                {
                    movieDataThList.map((item,index) => {
                        return <th key={index}>{item}</th>
                    })
                }
                </tr>
            </thead>
            <tbody>
            {
                movieData.map(item => {
                    return <tr onClick={() => { deleteMovie(item.id,num) }} key={item.id}>
                        <td style={{maxWidth:"100px"}}>{item.name}</td>
                        <td style={{maxWidth:"120px"}}>{item.cover}</td>
                        <td style={{maxWidth:"120px"}}>{item.type}</td>
                        <td style={{maxWidth:"100px"}}>{item.web}</td>
                        <td style={{maxWidth:"120px"}}>{item.country}</td>
                        <td style={{maxWidth:"120px"}}>{item.language}</td>
                        <td >{item.timeLen}</td>
                        <td style={{maxWidth:"120px"}}>{item.anotherName}</td>
                        <td>{item.score}</td>
                        <td style={{maxWidth:"120px"}}>{item.brief}</td>
                        <td>{timeFormatChange(item.time)}</td>
                    </tr>
                })
            }
            </tbody>
        </table>)
    }

    function addMovie(){
        axios.post('/api/management/addMovie',{
            name:movieName,
            cover,
            type,
            web,
            country,
            language,
            timeLen,
            anotherName,
            score,
            brief,
            time,
        })
            .then(function (res){
                const data = res.data
                if(data.errno === 0){
                    alert("添加成功")
                }else if(data.errno === 10003){
                    alert("没有管理员权限")
                }
            })
            .catch(function (err){
                console.log(err)
            })
    }

    function timeFormatChange(time:string){
        return time.substring(0,10)
    }

    function deleteMovie(movie_id:number,num:number){
        const result = window.confirm("确认删除此电影？")
        if(!result){
            return
        }
        axios.post('/api/management/delMovie',{
            movie_id:movie_id,
        })
            .then(function (res){
                const data = res.data
                if(data.errno === 0){
                    alert("删除成功")
                    setNum(num+1)
                }else if(data.errno === 10003){
                    alert("没有管理员权限")
                }
            })
            .catch(function (err){
                console.log(err)
            })
    }
}


export default Management;
