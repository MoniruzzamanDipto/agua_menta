import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@styled-icons/bootstrap";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import c from "./swipeableNav.module.css";

const SwipeableNav = ({ items }) => {
  const [position, setPosition] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);
  const nav = useRef(null);
  const navItems = useRef(null);

  useEffect(() => {
    if (nav.current && navItems.current) {
      const containerWidth = nav.current.offsetWidth;
      const itemsWidth = navItems.current.scrollWidth;
      setMaxPosition(containerWidth - itemsWidth);
    }
  }, [items]);

  const handleSwipeRight = () => {
    setPosition((prevPosition) => Math.max(prevPosition - 100, maxPosition));
  };

  const handleSwipeLeft = () => {
    setPosition((prevPosition) => Math.min(prevPosition + 100, 0));
  };

  return (
    <div className={c.swipeable_nav_container}>
      <div className={c.swipeable_nav} ref={nav}>
        <div
          className={c.swp}
          style={{ transform: `translateX(${position}px)` }}
          ref={navItems}
        >
          {items.map((item, index) => (
            <Link
              href={`/gallery?category=${item.slug}`}
              shallow={true}
              key={index}
              className={`${c.nav_item} swp-nav-item`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className={c.control}>
        <button onClick={handleSwipeLeft} disabled={position === 0}>
          <ChevronLeft width={30} height={30} />
        </button>
        <button onClick={handleSwipeRight} disabled={position <= maxPosition}>
          <ChevronRight width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default SwipeableNav;
