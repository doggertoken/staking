import React from 'react';
import styled from 'styled-components';
import LogoImage from '../Images/logo.png';

interface Props {
    theme: string;
}

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 1020px) {
        width: 100%;
        min-height: 0vh;
        margin-top: 150px;
        margin-bottom: 10px;
    }
    
`
const ImageContainer = styled.div`
    width: 80%;
    margin-left: 10%;
    margin-top: -125px;
    display: flex;
    justify-content: center;
    height: 350px;
`
const Logo = styled.img`
    height: 350px
`
const Heading = styled.h3`
    font-size: 30px;
    text-align: center;
    width: 100%:
    margin: 0px;
    color: ${props => props.theme.textPrimaryLight};
`
const Description = styled.h3`
    width: 80%;
    margin: 0px;
    margin-top: -10px;
    margin-left: 10%;
    font-size: 22.5px;
    text-align: center;
    overflow-wrap: break-word;
    color: ${props => props.theme.textAltLight};
    
`

const Header:React.FC<Props> = props => {
    return (
        <Container>
            <ImageContainer>
                <Logo src={LogoImage}/>
            </ImageContainer>
                <Heading>Dogger Staking</Heading>
                <Description>Stake $DOGGER tokens for a locked or unlocked time to receive $DOGGER rewards</Description>
        </Container>
    )
}

export default Header;