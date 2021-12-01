import { FC } from 'react';
import styled from 'styled-components';

import { colors } from '../constants';

interface Props {
  margin?: string,
  disabled?: boolean,
  background?: string,
  onClick?: (e?: any) => any,
  big?: boolean,
  secondary?: boolean,
}

const Button: FC<Props> = ({ disabled, children, ...props }) => {
  return (
    <StyledButton disabled={disabled} {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled('button')<{ margin?: string, background?: string, big?: boolean, secondary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${({ background }) => background || colors.BRAND};
  color: #fff;
  outline: none;
  border-radius: 5px;
  border: none;
  transition: background 200ms;
  cursor: pointer;

  &:hover {
    background: ${({ background }) => background || colors.BRAND}CC;
  }

  &:disabled {
    background: ${({ background }) => background || colors.BRAND}4D;
    cursor: not-allowed;
  }

  ${({ margin }) => margin && `
    margin: ${margin};
  `}

  ${({ big }) => big && `
    padding: 1rem 5rem;
  `}

  ${({ secondary }) => secondary && `
    background: ${colors.PRIM_BG};
    box-shadow: ${colors.BOX_SHADOW};
    border: 1px solid ${colors.LOW_OPACITY};
    color: ${colors.PRIM_TEXT_COLOR};

    &:hover {
      background: ${colors.SEC_BG};
    }
  `}
`;

export default Button;
