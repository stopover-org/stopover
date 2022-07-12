import React, {useState} from "react";
import styled from "styled-components";

const Wrapper = styled.div<{display: string | undefined}>`
    display: ${props => props.display};

`;
const ImageStyle = styled.div<{border: string }>`
    width: 125px;
    height: 125px;
    border: 4px solid ${props => props.border};
    border-radius: 5px;
    img{
        width: 100%;
        height: 100%;
    }
`;
const DescriptionStyle = styled.div`
    font-family: 'Roboto', sans-serif;
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

function ItemGallery(props: Props) {
    const transparent = "transparent";
    const borderColor = "#FF8A00";

    const [state, setState] = useState({
        isClicked: false,
        borderState: transparent 
    });
    const clickHandler = () => {
        setState({
            isClicked: !state.isClicked,
            borderState: !state.isClicked ?
            borderColor :
            transparent
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

export default ItemGallery;