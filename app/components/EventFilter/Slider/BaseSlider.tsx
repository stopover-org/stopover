import styled from "styled-components";

export const BaseSlider = styled.div<{
  displayHandle?: string;
  pointerEventsSlider?: string;
  pointerEventsHandle?: string;
}>`
  padding: 43px 0px 43px 0px;
  display: flex;
  align-items: center;
  .rc-slider {
    width: 380px;
    pointer-events: ${(props) => props.pointerEventsSlider};
  }
  .rc-slider-handle {
    pointer-events: ${(props) => props.pointerEventsHandle};
    display: ${(props) => props.displayHandle};
    background: #ff8a00;
    border: 2px solid #ffab49;
    height: 29px;
    width: 29px;
    top: -8px;
    opacity: 1;
  }
  .rc-slider-dot {
    background: #cacaca;
    border: none;
    border-radius: 5px 5px 5px 5px;
    width: 2px;
    height: 15px;
    top: -5px;
    z-index: -1;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #ffab49;
    box-shadow: 0 0 0 5px #ff8a00;
  }
  .rc-slider-track {
    background: #ff8a00;
    height: 15px;
    top: -6px;
  }
  .rc-slider-rail {
    background-color: #cacaca;
  }
`;

export default BaseSlider