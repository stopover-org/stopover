import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  width: 100vw;
  .blobs {
    border: 1px solid green;

    filter: url("#goo");
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @keyframes blob-left-top-anim {
    0% {
      transform: scale(1.1) translate(0, 0);
    }
    33% {
      transform: scale(0.9) translate(-65px, 0);
    }
    62% {
      transform: scale(0.7) translate(-65px, -65px);
    }
    94% {
      transform: scale(1.1) translate(0, 0);
    }
  }

  @keyframes blob-right-top-anim {
    0% {
      transform: scale(1.1) translate(0, 0);
    }
    33% {
      transform: scale(0.9) translate(65px, 0);
    }
    64% {
      transform: scale(0.7) translate(65px, -65px);
    }
    96% {
      transform: scale(1.1) translate(0, 0);
    }
  }
  @keyframes blob-left-bottom-anim {
    0% {
      transform: scale(1.1) translate(0, 0);
    }
    33% {
      transform: scale(0.9) translate(-65px, 0);
    }
    66% {
      transform: scale(0.7) translate(-65px, 65px);
    }
    98% {
      transform: scale(1.1) translate(0, 0);
    }
  }

  @keyframes blob-right-bottom-anim {
    0% {
      transform: scale(1.1) translate(0, 0);
    }
    33% {
      transform: scale(0.9) translate(65px, 0);
    }
    68% {
      transform: scale(0.7) translate(65px, 65px);
    }
    100% {
      transform: scale(1.1) translate(0, 0);
    }
  }
  .blob {
    position: absolute;
    background: #e97b7a;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: white;
    font-size: 40px;
    margin-top: -50px;
    margin-left: -50px;
    animation: blob-left-top-anim cubic-bezier(0.77, 0, 0.175, 1) 4s infinite;

    &:nth-child(2) {
      animation-name: blob-right-top-anim;
    }
    &:nth-child(3) {
      animation-name: blob-left-bottom-anim;
    }
    &:nth-child(4) {
      animation-name: blob-right-bottom-anim;
    }
  }
  /*.square{
    position:absolute;
    background:#5677fc;
    left:50%;
    top:50%;
    width:100px;
    height:100px;
    margin-top:-50px;
    margin-left:-50px;
    filter:url('#drop-shadow');
    }*/
`;

function Index() {
  return (
    <Wrapper>
      <div className="blobs">
        <div className="blob">4</div>
        <div className="blob">3</div>
        <div className="blob">2</div>
        <div className="blob">1</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </Wrapper>
  );
}
export default Index;
