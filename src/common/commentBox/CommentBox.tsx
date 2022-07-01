import React  from "react"
import style from "./commentBox.styl"
import Star from "../star/Star";
import mixins from "../../assets/style/mixins.styl"
import {Link} from "react-router-dom";

interface commentType{
    longComment_id: number,
    title: string,
    content: string,
    score: number,
    movie_id: number,
    cover: string,
    user_id: number,
    username: string,
    movie_name:string;
}

interface PropsType{
    comment:commentType
}

const CommentBox:React.FC<PropsType> = (props) => {
    const { longComment_id,title, content, score, movie_id, cover, user_id, username,movie_name } = props.comment
    return(
        <div className={style.container}>
            <div className={style.left}><img src={cover}/></div>
            <div className={style.right}>
                <Link to={`/longCommentDetail/${longComment_id}/0`}><h1 className={style.title}>{title}</h1></Link>
                <div className={style.movieInfo}>
                    <Link to={`/personal/${user_id}`}><span className={style.username}>{username}</span></Link>评论
                    <Link to={`/detail/${movie_id}`}><span className={style.movieName}>{movie_name}</span></Link>
                    <div className={style.star_wrapper}><Star score={score}/></div>
                </div>
                <p className={[style.desc,mixins.multilineEllipsis].join(" ")}>
                    {content}
                </p>
            </div>
        </div>
    )
}


export default CommentBox;
