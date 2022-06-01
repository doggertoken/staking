import React  from 'react';
import styled from 'styled-components';

interface Props { 
    width: string;
    selected?: boolean;
    updateStakeType: (value:string) => void;
    className?: string;
}

const Container = styled.div<Pick<Props, 'width'> >`
    width: ${props => props.width || '100%'}; 
    height: auto;
    background: ${({ theme }) => theme.body}
    display: flex;
    justify-content: space-around;
    color: ${({ theme }) => theme.textMain};
`
const InnerContainer = styled.div`
    width: 90%;
    margin-left: 10%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.body};
    border-radius: ${({ theme }) => theme.borderRounding};
    -webkit-box-shadow: inset 0px 0px 30px 7px rgba(0,0,0,0.2); 
    box-shadow: inset 0px 0px 30px 7px rgba(0,0,0,0.2);
`
const Selection = styled.button<Pick<Props, 'width' | 'selected'> >`
    width: ${props => `${(100 / 2)}%` || '100%'};
    border: 0px;
    height: 30px;
    margin: 4px; 
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    background-color: transparent;
    border-radius: ${({ theme }) => theme.borderRounding} ${({ theme }) => theme.borderRounding} 0 0;
    border-bottom: 2px solid ${({ theme }) => theme.textAltLight};
    color: ${({ theme }) => theme.textPrimaryLight};
    font-weight: bold;
    font-size: 15px;

    ${({ selected }) => selected &&`
        border: 2px solid #ECF6FE;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 50px 2px rgba(0,224,146,0.2); 
        box-shadow: 0px 0px 50px 2px rgba(0,224,146,0.2);
        z-index: 10000;      
    `} 
`   

const MultiSelector: React.FC<Props> = (props) => {

    const [selected, setSelected] = React.useState('Unlocked');

    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.preventDefault();
        setSelected(event.currentTarget.name)
        props.updateStakeType(event.currentTarget.name)
    }

    return (
        <Container width={props.width}>
            <InnerContainer>
            <Selection name='Unlocked' onClick={handleChange} selected={ selected === 'Unlocked' ? true : false} style={{marginLeft: '7.5px'}} width={props.width} >Unlocked</Selection>
                <Selection name='60 Day Lock' onClick={handleChange} selected={ selected === '60 Day Lock' ? true : false} style={{marginRight: '7.5px'}} width={props.width} >60 Day Lock</Selection>
            </InnerContainer>
        </Container>
    )
}

export default MultiSelector;