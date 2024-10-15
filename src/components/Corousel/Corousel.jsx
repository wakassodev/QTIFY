// import Swiper core and required modules
import React, { useEffect } from 'react';
import { Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import styles from './Corousel.module.css';

// Import Swiper styles
import 'swiper/css';
import LeftNavigation from './CorouselLeftNavigation/LeftNavigation';
import RightNavigation from './CorouselRightNavigation/RightNavigation';


const Controls = ({data}) => {
    const swiper = useSwiper();
    useEffect(() => {
        swiper.slideTo(0);
        // eslint-disable-next-line
    },[data]);
    return <></>
}


function Carousel ({data, renderComponent}){
  return (
    <div className={styles.wrapper}>
        <Swiper 
        // install Swiper modules
        style={{padding: '0px 20px'}}
        initialSlide={0}
        modules={[Navigation]}
        spaceBetween={40}
        slidesPerView={'auto'}
        allowTouchMove
        >
            <Controls data={data} />
            <LeftNavigation />
            <RightNavigation />
            {
                data.map((ele) => (
                    <SwiperSlide>{renderComponent(ele)}</SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  );
};

export default Carousel;