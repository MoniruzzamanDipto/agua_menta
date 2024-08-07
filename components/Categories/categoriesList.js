import { A11y, Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Category from "./categories";
import c from "./category.module.css";
import { useTranslation } from "react-i18next";

const breakpointNewArrival = {
  600: {
    slidesPerView: 1,
  },
  700: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};

function CategoryList(props) {
  const { t } = useTranslation();

  if (!props.categoryList || !props.categoryList.length) {
    return null;
  }

  return (
    <div className="content_container">
      <div className="custom_container">
        <h2 className="content_heading">{t("top_categories")}</h2>
        <div className={c.root_container}>
          <Swiper
            modules={[A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={breakpointNewArrival}
            className={`_feature_slider ${c.root_container}`}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            loop={false}
            centeredSlides={false}
            centerInsufficientSlides={true}
            speed={900}
          >
            {props.categoryList &&
              props.categoryList.map((category, index) => (
                <SwiperSlide key={category._id}>
                  <Category
                    name={category.name}
                    slug={category.slug}
                    img={category.banner[0]?.url}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
