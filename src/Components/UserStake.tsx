import React from 'react';
import styled from 'styled-components';
import Button from './Common/Button';
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
    pendingRewards?: number;
    userStaked?: number;
    userUnlockTime?: number;
    hidden?: boolean;
    poolId?: number;
    data: Data
}

const Container = styled.div`
    width: 90%;
    margin-top: 10px;
    margin-left: 5%;
    flex-wrap: wrap;
`

const Heading = styled.h3`
    width: 80%;
    font-size: 15px;
    margin-left: 10%;
    color: ${props => props.theme.textAltBlue};
    text-align: center;
    padding-top: 15px;
    margin-top: 0px;
    border-top: 1px solid ${props => props.theme.textPrimaryBlue};
`
const DetailsContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: -15px;
    flex-wrap: wrap;
    margin-bottom: 20px;
`
const DetailsHeader = styled.h3`
    width: 50%;
    color: ${({ theme }) => theme.textAltBlue};
    font-size: 12.5px;
    margin-bottom: -10px;
`
const DetailsValue = styled.h3`
    width: 50%;
    color: ${({ theme }) => theme.textPrimaryBlue};
    font-size: 12.5px;
    text-align: right;
    margin-bottom: -10px;
`
const WithdrawButton = styled(Button)`
    margin-top: 20px;
    background-color: ;
`

const ClaimButton = styled(Button)`
    margin-top: 20px;
    margin-left: 0%;
`
const CompoundButton = styled(Button)`
    margin-top: 20px;
    margin-left: 5%;
`

const Disclaimer = styled.h3`
    width: 100%;
    font-size: 12.5px;
    color: ${({ theme }) => theme.textPrimaryBlue};
`

const UserStake: React.FC<Props> = (props) => {
    const [canClaim, setCanClaim] = React.useState(false);
    const [claimTime, setClaimTime] = React.useState({
        days: 60,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const getCountdown = (deadline) => {
        const now = Date.now() / 1000;
        const total = deadline - now;
        const _seconds = Math.floor((total) % 60);
        const _minutes = Math.floor((total / 60) % 60);
        const _hours = Math.floor((total / (60 * 60)) % 24);
        const _days = Math.floor(total / (60 * 60 * 24));

        setClaimTime({
            days: _days > 0 ? _days : 0,
            hours: _hours > 0 ? _hours: 0,
            minutes: _minutes > 0 ? _minutes: 0,
            seconds: _seconds > 0 ? _seconds: 0
        })

        if(claimTime.days < 1 && claimTime.hours < 1 && claimTime.minutes < 1 && claimTime.seconds < 1) {
            setCanClaim(true);
        } else {
            setCanClaim(false);
        }
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            if(props.data.unlockTime > Date.now() / 1000) {
                getCountdown(props.data.unlockTime);
            } else if (props.data.unlockTime < Date.now() / 1000) {
                setCanClaim(true);
            }
        }, 1000)

        return () => clearInterval(interval);
    })

    const handleWithdraw = async () => {
        if(props.poolId == 0) {
            await WriteInterface.withdraw(0);
        } else if (props.poolId == 1 && canClaim) {
            await WriteInterface.withdraw(1);
        } else {
            await WriteInterface.earlyWithdraw(1);
        }
    }

    return (
        <Container>
            <Heading>Your Staking</Heading>
            <DetailsContainer>
                <DetailsHeader>Staked Dogger</DetailsHeader>
                <DetailsValue>{`${props.data.userStaked.toFixed(2)} Dogger`}</DetailsValue>
                {props.poolId == 1 ? <DetailsHeader>Time to Unlock</DetailsHeader> : <DetailsHeader>Time to Unlock</DetailsHeader>}
                {props.poolId == 1 ? <DetailsValue>{`${claimTime.days}d ${claimTime.hours}hr ${claimTime.minutes}m ${claimTime.seconds}s`}</DetailsValue> : <DetailsValue>Unlocked</DetailsValue>}
                <WithdrawButton onClick={handleWithdraw} width='100%' height='30px' text={!canClaim && props.poolId == 1 ? ' Early Withdraw (20% Penalty)' : 'Withdraw'} primary={(props.poolId == 0) || (canClaim) ? true : false} error={!canClaim && props.poolId == 1 ? true : false}></WithdrawButton>
                <DetailsHeader>Pending Rewards</DetailsHeader>
                <DetailsValue>{`${props.data.pendingRewards.toFixed(2)} Dogger`}</DetailsValue>
                <ClaimButton onClick={async () => await WriteInterface.claim(props.poolId)} success text='Claim' width='47.5%' height='30px' />
                <CompoundButton onClick={async () => await WriteInterface.compound(props.poolId)} success text='Compound' width='47.5%' height='30px' />
            </DetailsContainer>
        </Container>
    )
}

export default UserStake;