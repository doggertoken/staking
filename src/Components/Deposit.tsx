import styled from 'styled-components';
import React from 'react';
import Button from '../Components/Common/Button';

interface Props {
    theme: string;
    balance: number;
    updateDepositAmount: React.Dispatch<React.SetStateAction<number>>;
}

const DepositContainer = styled.div`
    width: 90%;
    margin-left: 5%;
    display: flex;
    flex-wrap: wrap;
    margin-top: -20px;
    margin-bottom: 10px;
`
const DepositInnerContainer = styled.span`
    background-color: ${({ theme }) => theme.body};
    border-radius: ${({ theme }) => theme.borderRounding};
    min-width: 100%;
    display: flex;
`
const DepositHeading = styled.h3`
    width: 40%;
    color: ${({ theme }) => theme.textPrimaryBlue};
    font-size: 12.5px;
`
const DepositBalance = styled.h3`
    width: 60%;
    color: ${({ theme }) => theme.textAltBlue};
    font-size: 12.5px;
    text-align: right;
`
const DepositInput = styled.input`
    border: hidden;
    background-color: transparent;
    font-weight: bold;
    color: ${({ theme }) => theme.textPrimaryLight};
    width: 70%;
    margin: 10px;
    outline: none;
`
const DepositLabel = styled.h3`
    width: 30%;
    text-align: right;
    font-size: 15px;
    font-weight: bold;
    margin-right: 15px;
    color: ${({ theme }) => theme.textPrimaryLight};
`
const ButtonContainer = styled.div`
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`

const Deposit: React.FC<Props> = (props) => {
    const [depositAmount, setDepositAmount] = React.useState('0');

    const handleChange = (e) => {
        try {
            setDepositAmount(e.target.value)
            props.updateDepositAmount(parseFloat(e.target.value));
        } catch (err) {
            console.log(err);
            props.updateDepositAmount(0);
        }
    }

    const updateValues = (amount: number, divisor: number) => {
        if (amount && amount > 0) {
            setDepositAmount((amount * divisor).toString());
            props.updateDepositAmount(amount * divisor);
        }
    }

    return (
        <DepositContainer>
            <DepositHeading>Deposit DOGGER</DepositHeading>
            <DepositBalance>{`${props.balance.toFixed(2)} DOGGER`}</DepositBalance>
            <DepositInnerContainer>
                <DepositInput value={isNaN(parseFloat(depositAmount)) ? '0' : parseFloat(depositAmount)} onChange={handleChange} placeholder='0.0' />
                <DepositLabel>$DOGGER</DepositLabel>
            </DepositInnerContainer>
            <ButtonContainer>
                <Button onClick={() => updateValues(props.balance, 0.25)} primary theme={props.theme} text='25%' width='20%' height='100%' />
                <Button onClick={() => updateValues(props.balance, 0.5)} primary theme={props.theme} text='50%' width='20%' height='100%' />
                <Button onClick={() => updateValues(props.balance, 0.75)} primary theme={props.theme} text='75%' width='20%' height='100%' />
                <Button onClick={() => updateValues(props.balance, 1)} primary theme={props.theme} text='100%' width='20%' height='100%' />
            </ButtonContainer>
        </DepositContainer>
    )
}

export default Deposit;