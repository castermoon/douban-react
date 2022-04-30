import React, { Fragment,Component,useEffect,useState } from "react"
import CommonHeader from "../../common/commonHeader/CommonHeader";
import BaseBody from "../../common/baseBody/BaseBody";
import CommonFooter from "../../common/commonFooter/CommonFooter";
import style from "./celebrity.styl"
import { Link,useParams } from "react-router-dom"
import axios from "axios"
import mixins from "../../assets/style/mixins.styl"
import CommonLabel from "../../common/commonLabel/CommonLabel";

const Celebrity = () => {
	const [data, setData] = useState({
		celebrityData:{},
		recentWorksListData:[]
	});

	const params = useParams();

	//getData
	useEffect(()=>{
		axios.get('/api/celebrity/'+params.celebrity_id)
			.then((res)=>{
				setData(res.data.data)
			})
	},[])

	const { celebrityData,recentWorksListData } = data
	return(
		<Fragment>
			<CommonHeader />
			<BaseBody
				title={celebrityData.name}
				left={
					<Fragment>
						<div className={style.celebrityContent}>
							<div className={style.celebrityContentImgWrapper}>
								<img src={celebrityData.icon}/>
							</div>
							<div className={style.celebrityContentDesc}>
								<CommonLabel label="性别" content={celebrityData.sex}/>
								<CommonLabel label="星座" content={celebrityData.constellation}/>
								<CommonLabel label="出生日期" content={celebrityData.birth}/>
								<CommonLabel label="职业" content={celebrityData.vocation}/>
								<CommonLabel label="更多外文名" content={celebrityData.anotherName}/>
								<CommonLabel label="更多中文名" content={celebrityData.anotherChineseName}/>
								<CommonLabel label="IMDB链接" content={celebrityData.indbLink}/>
								<CommonLabel label="官方网站" content={celebrityData.web}/>
							</div>
						</div>
						<div className={style.celebrityDetail}>
							<div className={style.celebrityDetailTitle}>影人简介  · · · · · ·</div>
							<div className={style.celebrityDetailContent} dangerouslySetInnerHTML={{__html:celebrityData.desc}}/>
						</div>
						<div className={style.recentWorks}>
							<div className={style.recentWorksTitle}>最近的5部作品（已上映）  · · · · · ·</div>
							<ul className={[style.recentWorksList,style.clearfix].join(" ")}>
								{
									recentWorksListData.map(item => {
										return <Link className={style.recentWorksItem} key={item.id} to={`/detail/${item.id}`}>
											<div className={style.recentWorksItemTitle}>{item.time}</div>
											<div className={style.recentWorksImgWrapper}><img className={style.recentWorksImg} src={item.cover}/></div>
											<p className={[style.recentWorksInfo,mixins.multilineEllipsis].join(" ")}>{item.name}</p>
											<div className={style.score}>{item.score}</div>
										</Link>
									})
								}
							</ul>
						</div>
					</Fragment>
				}
			/>
			<CommonFooter/>
		</Fragment>
	)
}


export default Celebrity;
