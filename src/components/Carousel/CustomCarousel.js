import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowSize = 40;
const arrowPadding = 10;
const arrowCardSize = arrowSize + 2 * arrowPadding;
const arrowSizePixel = `${arrowSize}px`;
const arrowCardSizePixel = `${arrowCardSize}px`;
const arrowToCarouselMargin = 10;
const animationSpeed = 500;

class Arrow extends React.PureComponent {
  syncArrowState = () => {
    const {
      className,
      type,
      setPrevArrowDisplayState,
      setNextArrowDisplayState
    } = this.props;

    const isDisabled = className.includes("slick-disabled");
    if (type === "prev" && setPrevArrowDisplayState != null) {
      setPrevArrowDisplayState(!isDisabled);
    } else if (type === "next" && setNextArrowDisplayState != null) {
      setNextArrowDisplayState(!isDisabled);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.className.includes("slick-disabled") !==
      this.props.className.includes("slick-disabled")
    ) {
      this.syncArrowState();
    }
  }
  componentDidMount() {
    this.syncArrowState();
  }
  render() {
    // do not use built in classNames due to ant design CSS conflicts
    const { className, type, style, onClick, isHidden } = this.props;
    const offset =
      type === "prev"
        ? { left: `${-arrowCardSize - arrowToCarouselMargin}px` }
        : { right: `${-arrowCardSize - arrowToCarouselMargin}px` };
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
          width: arrowCardSizePixel,
          height: "100%",
          padding: `${arrowPadding}px`,
          transform: "translate(0, -50%)",
          cursor: "pointer",
          border: "none",
          outline: "none",
          background: "#e6e6e6",
          display: !isHidden ? "flex" : "none",
          alignItems: "center",
          color: "black",
          opacity: isDisabled ? 0.3 : 1
        }}
        onClick={onClick}
      >
        <div>
          {type === "prev" ? (
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
          ) : (
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
          )}
        </div>
      </span>
    );
  }
}

const measureNodeWidth = (reactElement, shouldUseClientWidth = false) => {
  const DOMNode = ReactDOM.findDOMNode(reactElement);
  if (DOMNode == null) {
    return 0;
  }
  return shouldUseClientWidth ? DOMNode.clientWidth : DOMNode.offsetWidth;
};

export default class CustomCarousel extends React.PureComponent {
  state = {
    shouldShowPrevArrow: false,
    shouldShowNextArrow: false,
    isInit: true,
    slidesToScroll: 0,
    slidesToShow: 0
  };
  childrenRefs = [];
  carouselElement = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.updateSlidesPerScreen);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSlidesPerScreen);
  }

  componentDidUpdate() {
    this.updateSlidesPerScreen();
  }

  updateSlidesPerScreen = () => {
    const singleItem = this.childrenRefs[0];
    // use 1 to avoid divide by 0
    const singleItemWidth =
      singleItem != null ? measureNodeWidth(singleItem) : 1;
    // for carousel, need to use client width to get accurate measurement due to the use of transform
    const carouselWidth =
      this.carouselElement != null
        ? measureNodeWidth(this.carouselElement, true)
        : 0;

    // magic number 16 is to account for the margins between the items
    // this is set in a CSS file..
    const slidesPerScreen = Math.floor(carouselWidth / (singleItemWidth + 16));

    if (slidesPerScreen >= 0) {
      // the following is hacky - for the initial render, because the left arrow is hidden,
      // we MIGHT have to subtract one to account for
      // the fact that once scrolled the arrow will appear, taking up space...
      // the value can only be 0 on initial render...
      // This could break if mermcard changes significantly or if arrow sizes change significantly
      this.setState(state => {
        const slidesToScroll =
          state.slidesToScroll === 0 ? slidesPerScreen - 1 : slidesPerScreen;
        return {
          ...state,
          slidesToShow: slidesPerScreen,
          slidesToScroll
        };
      });
    }
  };

  setNextArrowDisplayState = shouldShowNextArrow => {
    if (
      this.state.shouldShowNextArrow === true &&
      this.state.shouldShowPrevArrow === true
    )
      // do not hide anything if both arrows have been displayed
      return;

    this.setState(state => {
      return { ...state, shouldShowNextArrow };
    });
  };

  setPrevArrowDisplayState = shouldShowPrevArrow => {
    if (
      this.state.shouldShowNextArrow === true &&
      this.state.shouldShowPrevArrow === true
    )
      // do not hide anything if both arrows have been displayed
      return;

    this.setState(state => {
      return { ...state, shouldShowPrevArrow };
    });
  };

  render() {
    const {
      shouldShowNextArrow,
      shouldShowPrevArrow,
      slidesToScroll,
      slidesToShow
    } = this.state;

    const { shouldUseDynamicArrows } = this.props;

    const isPrevArrowHidden = shouldUseDynamicArrows
      ? !shouldShowPrevArrow
      : slidesToShow >= this.props.children.length;

    const isNextArrowHidden = shouldUseDynamicArrows
      ? !shouldShowNextArrow
      : slidesToShow >= this.props.children.length;

    const settings = {
      infinite: false,
      speed: animationSpeed,
      slidesToShow,
      slidesToScroll,
      prevArrow: (
        <Arrow
          isHidden={isPrevArrowHidden}
          type="prev"
          setPrevArrowDisplayState={this.setPrevArrowDisplayState}
        />
      ),
      nextArrow: (
        <Arrow
          isHidden={isNextArrowHidden}
          type="next"
          setNextArrowDisplayState={this.setNextArrowDisplayState}
        />
      ),
      variableWidth: true
    };
    const sidePaddingValue = `${arrowSize + arrowToCarouselMargin + 5}px`;
    // the custom-carousel classname is used to add margins
    return (
      <div
        style={{
          paddingLeft: !isPrevArrowHidden ? sidePaddingValue : "0px",
          paddingRight: !isNextArrowHidden ? sidePaddingValue : "0px"
        }}
        ref={r => {
          this.carouselElement = r;
        }}
      >
        <Slider {...settings} className="custom-carousel">
          {React.Children.map(this.props.children, (element, idx) => {
            return React.cloneElement(element, {
              ref: child => {
                this.childrenRefs[idx] = child;
              }
            });
          })}
        </Slider>
      </div>
    );
  }
}
