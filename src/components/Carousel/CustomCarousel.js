import React from "react";
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowSize = 40;
const arrowSizePixel = `${arrowSize}px`;
const arrowToCarouselMargin = 5;
const slidesToScroll = 3;
const slidesToShow = 3;
const animationSpeed = 500;

const Arrow = props => {
  // do not use built in classNames due to ant design CSS conflicts
  const { className, type, style, onClick } = props;
  const offset =
    type === "prev"
      ? { left: `${-arrowSize - arrowToCarouselMargin}px` }
      : { right: `${-arrowSize - arrowToCarouselMargin}px` };
  const isDisabled = className.includes("slick-disabled");

  return (
    <span
      style={{
        ...style,
        ...offset,
        fontSize: arrowSizePixel,
        lineHeight: 0,
        position: "absolute",
        top: "50%",
        width: arrowSizePixel,
        height: arrowSizePixel,
        padding: 0,
        transform: "translate(0, -50%)",
        cursor: "pointer",
        border: "none",
        outline: "none",
        background: "transparent",
        display: "block",
        color: "black",
        opacity: isDisabled ? 0.3 : 1
      }}
      onClick={onClick}
    >
      {type === "prev" ? (
        <FontAwesomeIcon icon="arrow-alt-circle-left" />
      ) : (
        <FontAwesomeIcon icon="arrow-alt-circle-right" />
      )}
    </span>
  );
};

export default function CustomCarousel(props) {
  const settings = {
    infinite: false,
    speed: animationSpeed,
    slidesToShow,
    slidesToScroll,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
    variableWidth: true
  };
  // the custom-carousel classname is used to add margins
  return (
    <div style={{ margin: `0 ${arrowSize + arrowToCarouselMargin}px` }}>
      <Slider {...settings} className="custom-carousel">
        {props.children}
      </Slider>
    </div>
  );
}
