import React from 'react';
import styled from 'styled-components';

interface Props {
    theme: string;
    height?: string;
    width?: string;
    className?: string;
    text: string;
    primary?: boolean;
    secondary?: boolean;
    error?: boolean;
    success?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonObj = styled.button<Pick<Props, 'height' | 'width' | 'primary' | 'secondary' | 'error' | 'success' >>`
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '100%'};
    border: 0px;
    border-radius: ${props => props.theme.button.borderRounding};
    color: ${props => props.theme.button.textColor};
    font-weight: bold;
    -webkit-box-shadow: ${props => props.theme.button.boxShadow};
    box-shadow: ${props => props.theme.button.boxShadow};

    ${({ primary, theme, disabled }) => primary && `
    background: ${disabled ? theme.buttonDisabled : theme.button.primaryBG};
    `}

    ${({ secondary, theme, disabled }) => secondary && `
    background: ${disabled ? theme.buttonDisabled : theme.button.secondaryBG};
    `}

    ${({ error, theme, disabled }) => error && `
    background: ${disabled ? theme.buttonDisabled : 'linear-gradient(90deg, rgba(214,73,51,1) 0%, rgba(170,52,34,1) 100%)'};
    `}

    ${({ success, theme, disabled }) => success && `
    background: ${disabled ? theme.buttonDisabled : 'linear-gradient(90deg, rgba(24,180,50,1) 0%, rgba(20,144,40,1) 100%)'};
    `}
`

const Button: React.FC<Props> = props => {

    return (
        <ButtonObj onClick={props.onClick} error={props.error} success={props.success} secondary={props.secondary} primary={props.primary} width={props.width} height={props.height} className={props.className}>{props.text}</ButtonObj>
    )
}

export default Button;