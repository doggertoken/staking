import React from 'react';
import styled from 'styled-components';
import Button from './Common/Button';
import priceLogo from '../Images/logo-blue.png'
import ConnectModal from './ConnectModal';

interface Props {
    theme: string;
    manualConnect: (connector: any) => void;
    address: string;
    openModal: () => void;
}

const Container = styled.div`
    max-width: 95%;
    min-width: 95%;
    margin-left: 2.5%;
    max-height: 10vh;
    min-height: 10vh;
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
`
const ConnectButton = styled(Button)`
    margin-top: 10px;
    margin-left: auto;
    margin-right: 10px;
    font-size: 15px;

    @media (max-width: 768px) {
        width: 150px;
    }

    &:hover {
        box-shadow: 0px 0px 35px 10px rgba(236, 246, 254,0.3)
    }
`
const Logo = styled.img`
    height: 60px;
    margin-top: 5px;
    margin-left: 10px;
`
const PriceContainer = styled.div`
    display: flex;
    height: 45px;
    margin-top: 12.5px;
    background-color: ${props => props.theme.bodyLighter};
    border-radius: ${props => props.theme.borderRounding};
    margin-right: auto;
    margin-left: 10px;
    -webkit-box-shadow: ${props => props.theme.button.boxShadow};
    box-shadow: ${props => props.theme.button.boxShadow};

    @media (max-width: 768px) {
        width: 120px;
    }
`
const PriceLogo = styled.img`
    margin-left: 2.5px;
    margin-top: 2.5px;
    height: 40px;
`
const PriceText = styled.h3`
    margin-right: 15px; 
    margin-top: 15px;
    margin-left: 5px;
    color: #319fef;
    font-weight: bold;
    font-size: 15px;
    @media (max-width: 768px) {
        font-size: 12.5px
    }
`

const Nav: React.FC<Props> = props => {

    return (
        <Container>
            {/* <PriceContainer>
                <PriceLogo src={priceLogo} />
                <PriceText>$0.00023</PriceText>
            </PriceContainer> */}
            <ConnectButton onClick={props.openModal} primary theme={props.theme} height='50px' width='200px' text={props.address != null ? props.address.substring(0, 5) + "..." + props.address.substring(38, 44) : "Connect"} />
        </Container>
    )
}

export default Nav;