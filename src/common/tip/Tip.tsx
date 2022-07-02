import React from "react"
import style from "./tip.styl"
import Star from "../star/Star";
import mixins from "../../assets/style/mixins.styl"
interface movieItemType{
    id:number,
    name:string,
    score:number,
    type:string
}

interface PropsType{
    movieItem:movieItemType
}

const Tip:React.FC<PropsType> = (props) => {
    const { score,id,name,type } = props.movieItem
    return (
        <div className={style.container}>
            <h1 className={style.title}>{name}</h1>
            <div className={style.star_wrapper}><Star score={score}/><span className={style.score}>{score}</span></div>
            <ul className={[style.label_list,mixins.clearfix].join(" ")}>
                {
                    labelListFormat(type).map((item,index) => {
                        return <li key={index} className={style.label_item}>{item}</li>
                    })
                }
            </ul>
        </div>
    )

    function labelListFormat(type:string):string[]{
        return type.split("/")
    }
}





export default Tip;
