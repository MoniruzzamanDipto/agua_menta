import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageLoader from "../Image";
import classes from "./header.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function Header(props) {
  const { t } = useTranslation();
  if (!props.carousel) return null;

  return (
    <div className="col-12 custom-carousel">
      <div className={classes.header}>
        <Carousel
          showArrows={false}
          showThumbs={false}
          showIndicators={true}
          emulateTouch={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          stopOnHover={true}
          interval={9000}
          transitionTime={900}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          {props.carousel.carouselData &&
            props.carousel.carouselData.map((item) => (
              <Link href={item.url} key={item.id}>
                <div className={classes.Header_container}>
                  <Image
                    src={item.image[0]?.url}
                    alt={item.title}
                    fill={false}
                    quality={100}
                    priority={true}
                    width={1920}
                    height={700}
                    className={classes.img_content}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Header;
