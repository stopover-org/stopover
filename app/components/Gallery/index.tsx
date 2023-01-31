import React from 'react';
import styled from 'styled-components';
import Column from '../Column';
import Row from '../Row';
import Typography from '../Typography';


const Gallerycontainer = styled(Column)`
    //border: 1px solid black;
    position: relative;
    overflow: hidden;       
`;

const Wrapper = styled(Column)<{overflow: string}>`
    //border: 3px solid green; 
    //position: relative;    
    overflow: ${props => props.overflow};    
`;

const Shot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 49%;
    //border: 1px solid red;
`;

const Img = styled.img`
    width: 100%;  
    background: #ccc;  
`;

const Title = styled.div`
    //border: 1px solid blue;    
    width: 100%;
    text-align: center;
`;

const WrapperClick = styled.div`
    position: absolute;
    bottom: -1px;
    width: 100%;
    //text-align: center;
    display: flex;
    justify-content: center;
    //border: 1px solid green;
`;

const BtnClick = styled.button`
    width: 225px;
    height: 40px;
    padding-top: 8px;
    border: 1px solid #888;
    border-radius: 5px;   
    cursor: pointer;
    background-color: #000;
    color: #FFF;
    opacity: 0.8;
    display: flex;
    justify-content: center;
`;


type Props = {
    opened: boolean;
    onOpen: () => void;
    onClose: () => void;
    images: Array<{src: string, title?: string}>;
    minHeight?: string | "600px";
    maxHeight?: string | "650px";
    width: string;
};

const Gallery = ({
    opened =  false,
    onOpen,
    onClose,
    images,
    minHeight,
    maxHeight,
    width,
}:Props) => {
    const clickHandler = () => {opened? onClose() : onOpen()};

    let arrEmpty = new Array(Math.floor(images.length/2));
    arrEmpty.fill(' ');

    return (
        <Gallerycontainer width={width} height={opened? maxHeight : minHeight}>

            <Wrapper overflow={opened? "auto" : "hidden"}>
                {arrEmpty.map((_, i) => {

                    return (
                        <Row 
                            key={images[i].src} 
                            justifyContent='space-between'
                            alignItems="flex-end"
                        >
                            <Shot>
                                <Img src={images[i*2].src} />
                                <Title>{images[i*2].title}</Title>
                            </Shot>
                            <Shot>
                                <Img src={images[i*2+1].src} />
                                <Title>{images[i*2+1].title}</Title>
                                </Shot>
                        </Row>
                    )
                })}           

            </Wrapper>

            <WrapperClick>
                <BtnClick onClick={clickHandler}>
                    <Typography size="16px">
                        {!opened ? "I want to see more" : "roll up"}
                    </Typography>
                </BtnClick>
            </WrapperClick>
        </Gallerycontainer>
    );
};


export default Gallery;