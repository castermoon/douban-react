import React from "react"
import style from "./popularComments.styl"
import CommentBox from "../../../../common/commentBox/CommentBox";

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
    popularCommentList:commentType[]
}

const PopularComments:React.FC<PropsType> = (props) => {
    const { popularCommentList } = props
    return(
        <div className={style.container}>
            <div className={style.title}>
                <span className={style.hot}>最受欢迎的影评</span>
            </div>
            <div className={style.list}>
                {
                    popularCommentList.length > 0 && popularCommentList.map((item,index) => {
                        return <div key={index} className={style.commentBox_wrapper}><CommentBox comment={item}/></div>
                    })
                }
            </div>
        </div>
    )
}


export default PopularComments;
