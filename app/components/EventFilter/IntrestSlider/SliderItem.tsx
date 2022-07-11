import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div<{display: string | undefined}>`
    display: ${props => props.display};

`;
const ImageStyle = styled.div<{border: string}>`
    width: 125px;
    height: 125px;
    border: ${props => props.border};
    border-radius: 5px;
    img{
        width: 100%;
        height: 100%;
    }
`;
const DescriptionStyle = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
`;


type Props = {
    name: string,
    image: string,
    description: string,
    id: string,
    display: boolean
}

function SliderItem(props: Props) {
    const [state, setState] = useState({
        isClicked: false,
        borderState: "4px solid transparent"
    });
    const clickHandler = () => {
        setState({
            isClicked: !state.isClicked,
            borderState: !state.isClicked ?
            "4px solid #FF8A00" :
            "4px solid transparent"
        })
    }

    return (
        <Wrapper
            display={props.display ? "block" : "none"}
            onClick={clickHandler}
        >
            <ImageStyle
            
                border={state.borderState}
            >
            <img 
                    src={props.image}
                />
            </ImageStyle>
            <DescriptionStyle>
                {props.description}
            </DescriptionStyle>
            
        </Wrapper>
    );
}

export default SliderItem;