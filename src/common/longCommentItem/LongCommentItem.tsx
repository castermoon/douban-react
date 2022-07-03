import React  from "react"
import style from "./longCommentItem.styl"
import mixins from "../../assets/style/mixins.styl"
import Star from "../star/Star";
import {Link} from "react-router-dom";

interface longCommentType{
    id: number,
    content: string,
    date: number,
    score: number,
    movie_id: number,
    title: string
    user_id: number,
    spoiler: number,
    nickname:string
}

interface PropsType{
    longComment:longCommentType
}


const CommentItem:React.FC<PropsType> = (props) => {
    const { id,content,date,score,title,user_id,nickname,spoiler } = props.longComment
    return(
        <li className={style.longCommentsListItem} key={id}>
            <div className={style.longCommentsListItemHeader}>
                <img className={style.icon} src="https://i.postimg.cc/yxMQQrWN/image.jpg" alt="头像"/>
                <div className={style.name}><a href="#">{nickname}</a></div>
                <div className={style.starWrapper}>
                    <Star score={score}/>
                </div>
                <div className={style.date}>{timestampChange(date)}</div>
            </div>
            <Link to={`/longCommentDetail/${id}/0`} className={style.longCommentsListItemTitle}>{ title }</Link>
            { spoiler && <div className={style.Spoiler}>| 这篇影评可能有剧透</div> }
            <p className={style.longCommentsListItemContent}>
                {content}
            </p>
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
