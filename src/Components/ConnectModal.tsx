import { Hidden } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import MetamaskLogo from '../Images/metamask.png'
import WalletConnectLogo from '../Images/walletconnect.png';

interface Props {
    theme: string;
    open: boolean;
    connect: (connector: any) => void;
    updateModal: () => void;
    provider: any;
    address: string;
}

interface Styles {
    metamask?: boolean;
    walletconnect?: boolean;
    top?: boolean;
    bottom?: boolean;
}

const Container = styled.div<Pick<Props, | 'open'>>`
    min-width: 250px;
    max-width: 250px;
    display: ${props => props.open ? 'flex' : 'none'};
    flex-wrap: wrap;
    position: absolute;
    background: #EEF7FB;
    left: 50%;
    border-radius: ${props => props.theme.borderRounding};
    top: 10%; 
    margin-left: -125px;
    -webkit-box-shadow: 5px 5px 30px 5000px rgba(0,0,0,0.5); 
    box-shadow: 5px 5px 30px 5000px rgba(0,0,0,0.5); 

    &:hover {
        -webkit-box-shadow: 5px 5px 30px 5000px rgba(0,0,0,0.65); 
        box-shadow: 5px 5px 30px 5000px rgba(0,0,0,0.65);  
    }
`
const Section = styled.div<Pick<Styles, 'metamask' | 'walletconnect' | 'top' | 'bottom'>>`
    width: 100%;
    height: 75px;
    display: flex;
    flex-wrap: no-wrap;
    cursor: pointer;

    &:hover {
        background: rgba(49, 159, 239, 0.25);
    } 

    ${({ top, theme }) => top && `
        border-bottom: 1px solid ${theme.textPrimaryBlue};
        border-top-left-radius: ${theme.borderRounding};
        border-top-right-radius: ${theme.borderRounding}; 
    `}

    ${({ bottom, theme }) => bottom && `
        border-bottom-left-radius: ${theme.borderRounding};
        border-bottom-right-radius: ${theme.borderRounding};
    `}
`
const Logo = styled.img`
    height: 70%;
    margin: 10px;
`
const Heading = styled.h3<Pick<Styles, 'metamask' | 'walletconnect'>>`
    font-size: 20px;
    margin-top: 25px;
    width: 60%;
    text-align: center;
    margin-left: 10px;
    color: ${props => props.theme.textAltBlue};
`

const ConnectModal: React.FC<Props> = props => {

    const [open, setOpen] = React.useState(props.open);

    const handleConnection = async (connector: string) => {
        if (connector == 'metamask') {
            await props.connect('injected')
        } else {
            await props.connect('walletconnect')
            setOpen(false);
        }
    }

    React.useEffect(() => {
        if (props.open) {
            setOpen(true);
        }
    }, [props.open])

    React.useEffect(() => {
        if (props.provider) {
            setOpen(false)
        }
    }, [props.provider])

    return (
        <Container open={open}>
            <Section onClick={async () => handleConnection('metamask')} metamask top>
                <Logo src={MetamaskLogo} />
                <Heading>Metamask</Heading>
            </Section>
            <Section onClick={() => {}} walletconnect bottom>
                <Logo src={WalletConnectLogo} />
                <Heading onClick={async () => handleConnection('walletconnect')}>Wallet Connect</Heading>
            </Section>
        </Container>
    )
}

export default ConnectModal;