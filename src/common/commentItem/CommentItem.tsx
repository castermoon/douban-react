import React  from "react"
import style from "./commentItem.styl"
import Star from "../star/Star";


interface commentType{
    id: number,
    content: string,
    date: number,
    score: number,
    user_id: number,
    movie_id: number,
    nickname: string
}

interface PropsType{
    comment:commentType
}

const CommentItem:React.FC<PropsType> = (props) => {
    const { id,content,date,score,user_id,nickname } = props.comment
    return(
        <li className={style.commentListItem} key={id}>
            <div className={style.commentDesc}>
                <div className={style.commentDescHeader}>
                    <img className={style.icon} src="https://i.postimg.cc/yxMQQrWN/image.jpg" alt="头像"/>
                    <div className={style.name}><a href="">{nickname}</a></div>
                    {score > 0 &&  <span>看过</span>}
                    {score === 0 && <span>想看</span>}
                    {score > 0 &&
                        <div className={style.starWrapper}>
                            <Star score={score}/>
                        </div>
                    }
                    <span className={style.date}>{timestampChange(date)}</span>
                </div>
                <div className={style.commentContent}>
                    {content}
                </div>
            </div>
        </li>
    )

    function timestampChange(timestamp:number) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
}


export default CommentItem;
