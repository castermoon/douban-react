import React  from "react"

import style from "./hotRecommend.styl"

import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




const HotRecommend:React.FC = () => {
    return(
        <div className={style.container}>
            <div className={style.title}>
                <span className={style.hot}>热门推荐</span>
            </div>
            <div className={style.photoContainer}>
                {getSwiper()}
            </div>
        </div>
    )
    function getSwiper () {
        return <Swiper
            modules={[Navigation, Pagination,]}
            navigation
            pagination={{ clickable: true,type:'fraction' }}
        >
            <SwiperSlide>
                <div className={style.slide_left}><img src={"https://i.postimg.cc/G4M7RLyD/075a5cd8faef84e.png"}/></div>
                <div className={style.slide_right}>
                    <p className={style.slide_right_title}>主旋律网络电影《狙击英雄》今日上线</p>
                    <p className={style.slide_right_desc}>热血谱写抗美援朝神枪手英雄史！不忘最冷的枪，不负最热的血。</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={style.slide_left}><img src={"https://i.postimg.cc/7CfBYF3W/61efcb9acd5ce76.png"}/></div>
                <div className={style.slide_right}>
                    <p className={style.slide_right_title}>《人生大事》导演刘江江</p>
                    <p className={style.slide_right_desc}>天上的每一颗星 都是爱过我们的人。</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={style.slide_left}><img src={"https://i.postimg.cc/BjZYRLXs/7c729d0c57ccb99.png"}/></div>
                <div className={style.slide_right}>
                    <p className={style.slide_right_title}>《怪奇物语》第四季中字预告</p>
                    <p className={style.slide_right_desc}>小11米莉·波比·布朗等主演悉数回归，第二辑7月1日上线！</p>
                </div>
            </SwiperSlide>
        </Swiper>
    }
}


export default HotRecommend;
