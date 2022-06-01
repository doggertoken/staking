import React from 'react';
import styled from 'styled-components';
import MultiSelector from '../Components/Common/MultiSelector';
import Button from './Common/Button';
import Deposit from './Deposit';
import UserStake from './UserStake';
import WriteInterface from '../writeInterface';

interface Data {
    apr: number,
    exitPenalty: number,
    totalStaked: number,
    userStaked: number,
    unlockTime: number,
    allowance: number,
    tokenBalance: number,
    pendingRewards: number,
}

interface Props {
    theme: string;
    updatePoolId: React.Dispatch<React.SetStateAction<number>>;
    data: Data;
}

const Container = styled.div`
    max-width: 400px;
    background: ${({ theme }) => theme.bodyLighter};
    margin-bottom: 25%;
    border-radius: ${props => props.theme.borderRounding};
    display: flex;
    flex-wrap: wrap;
    margin: 0px;
    -webkit-box-shadow: 5px 5px 15px 10px rgba(0,0,0,0.25); 
    box-shadow: 5px 5px 15px 10px rgba(0,0,0,0.25);

    @media only screen and (max-width: 1020px) {
        margin-bottom: 30px;
        margin-top: 30px;
    }
    @media only screen and (max-width: 550px) {
        width: 90%;
    }
`
const Selector = styled(MultiSelector)`
    margin-left: 5%;
`
const Header = styled.h3`
    margin: 0px; 
    padding: 5px;
    font-size: 15px;
    width: 100%;
    font-weight: bold;
    text-align: center;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.textPrimaryLight}
`
const APYContainer = styled.div`
    width: 90%;
    margin-top: -10px;
    margin-left: 5%;
    display: flex;
    flex-wrap: wrap;
`
const InfoContainer = styled.div`
    width: 90%;
    
    margin-left: 5%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`
const APYHeading = styled.h3`
    color: ${({ theme }) => theme.textAltBlue};
    font-size: 15px;
    min-width: 100%;
`
const APY = styled.h1`
    color: ${({ theme }) => theme.textPrimaryBlue};
    margin-top: -15px;
`
const InfoDescription = styled.h3`
    color: ${({ theme }) => theme.textAltBlue};
    font-size: 15px;
    width: 70%;
    margin-bottom: -10px;
`
const InfoValue = styled.h3`
    color: ${({ theme }) => theme.textPrimaryBlue};
    font-size: 15px;
    width: 30%;
    text-align: right;
    margin-bottom: -10px;
`
const DepositButton = styled(Button)`
    margin-left: 5%;
    margin-bottom: 10px;
`
const DepositMessage = styled.h3`
    color: ${({ theme }) => theme.textAltBlue};
    margin-left: 5%;
    font-size: 12.5px;
`
const Disclaimer = styled.h3`
    width: 100%;
    font-size: 12.5px;
    color: ${({ theme }) => theme.textPrimaryBlue};
    margin-bottom: 0px;
`


const StakingPanel: React.FC<Props> = props => {
    const [stakeType, setStakeType] = React.useState('Unlocked')
    const [depositAmount, updateDepositAmount] = React.useState(0);

    const updateStakeType = (value: string) => {
        setStakeType(value);
        props.updatePoolId(value == 'Unlocked' ? 0 : 1);
    }

    const handleDeposit = ( async() => {
        if(props.data.allowance <= props.data.tokenBalance) {
            console.log('hitting')
            await WriteInterface.approve(stakeType == 'Unlocked' ? 0 : 1);
        } else {
            await WriteInterface.deposit(stakeType == 'Unlocked' ? 0 : 1, depositAmount)
        }
    })

    return (
        <Container>
            <Header>Dogger Staking Pool</Header>
            <Selector updateStakeType={updateStakeType} theme={props.theme} width='90%' />
            <APYContainer>
                <APYHeading>APY</APYHeading>
                <APY>{props.data.apr}%</APY>
            </APYContainer>
            <Deposit updateDepositAmount={updateDepositAmount} balance={props.data.tokenBalance} theme={props.theme} />
            <InfoContainer>
                <InfoDescription>Total Staked:</InfoDescription>
                <InfoValue>{props.data.totalStaked.toFixed(2)}</InfoValue>
                <InfoDescription>Lockup Time:</InfoDescription>
                <InfoValue>{stakeType == 'Unlocked' ? 'Unlocked' : '60 Days'}</InfoValue>
                <InfoDescription>Early Exit Penalty: </InfoDescription>
                <InfoValue>{stakeType == 'Unlocked' ? '0%' : '20%'}</InfoValue>
                <Disclaimer>* Withdrawing before the end of the lockup period is subject to the early exit penalty</Disclaimer>
            </InfoContainer>
            {props.data.allowance <= props.data.tokenBalance ? <DepositMessage >Approve tokens for staking contract:</DepositMessage> : <></>}
            <DepositButton onClick={handleDeposit} width='90%' height='30px' primary theme={props.theme} text={props.data.allowance > props.data.tokenBalance ? 'Deposit' : 'Approve'} />
            <UserStake data={props.data} poolId={stakeType == 'Unlocked' ? 0 : 1} theme={props.theme} />
        </Container>
    )
}

export default StakingPanel;