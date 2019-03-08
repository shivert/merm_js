import React from "react";
import AliceCarousel from "react-alice-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowSize = 40;
const arrowPadding = 10;
const arrowCardSize = arrowSize + 2 * arrowPadding;
const arrowSizePixel = `${arrowSize}px`;
const arrowCardSizePixel = `${arrowCardSize}px`;

export default class MermCardCarousel extends React.Component {
  state = {
    currentIndex: 0,
    itemsInSlide: 1,
    isPrevArrowDisabled: true,
    isNextArrowDisabled: false,
    responsive: {
      799: { items: 2 },
      1023: { items: 3 },
      1279: { items: 3 },
      1439: { items: 4 }
    }
  };

  slidePrevPage = e => {
    e.preventDefault();

    if (this.state.currentIndex < 0 || this.state.currentIndex === 0) return;
    const nextIndex = this.state.currentIndex - this.state.itemsInSlide;
    const currentIndex = nextIndex >= 0 ? nextIndex : 0;
    this.setState({
      currentIndex,
      isPrevArrowDisabled: currentIndex === 0,
      isNextArrowDisabled: currentIndex === length - 1
    });
  };

  slideNextPage = e => {
    e.preventDefault();
    if (!this.state.isNextArrowDisabled) {
      const length = this.props.items.length;

      if (this.state.currentIndex > length - 1) return;

      const { itemsInSlide } = this.state;
      let currentIndex = this.state.currentIndex + itemsInSlide;
      if (currentIndex > length - 1) currentIndex = length - 1;
      this.setState({
        currentIndex,
        isNextArrowDisabled: currentIndex === length - 1,
        isPrevArrowDisabled: currentIndex === 0
      });
    }
  };

  handleOnSlideChange = event => {
    const { itemsInSlide, item } = event;
    this.setState({ itemsInSlide, currentIndex: item });
  };

  getItems = () => {
    const items = this.props.items;
    const mermLength = items.length;
    const threshold = 4;

    if (mermLength < threshold) {
      this.setState({ isNextArrowDisabled: true });

      for (let i = 0; i < threshold - mermLength; i++) {
        items.push(<div style={{ width: "310px" }} />);
      }
    }

    return items;
  };

  render() {
    const {
      currentIndex,
      responsive,
      isPrevArrowDisabled,
      isNextArrowDisabled
    } = this.state;

    return (
      <>
        <div
          style={{
            paddingLeft: arrowCardSize + 4,
            paddingRight: arrowCardSize + 4
          }}
        >
          <AliceCarousel
            buttonsDisabled
            responsive={responsive}
            slideToIndex={currentIndex}
            fadeOutAnimation={true}
            dotsDisabled
            infinite={false}
            items={this.getItems()}
            onInitialized={this.handleOnSlideChange}
            onResized={this.handleOnSlideChange}
          />
        </div>
        <button
          style={{
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
            display: "flex",
            alignItems: "center",
            color: "black",
            opacity: isPrevArrowDisabled ? 0.3 : 1
          }}
          onClick={this.slidePrevPage}
        >
          <div>
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
          </div>
        </button>
        <button
          style={{
            right: 0,
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
            display: "flex",
            alignItems: "center",
            color: "black",
            opacity: isNextArrowDisabled ? 0.3 : 1
          }}
          onClick={this.slideNextPage}
        >
          <div>
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
          </div>
        </button>
      </>
    );
  }
}
