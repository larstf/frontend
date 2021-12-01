import { useRouter } from 'next/router';
import styled from 'styled-components';

import { icons } from '../assets';
import { colors, typography } from '../constants';
import Button from './Button';

const Navigation: React.FC<{ url: string }> = ({ url }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <div>
        <StyledButton background="#1C252F" onClick={() => router.push(url)}>
          <icons.arrowBack width="15px" fill={colors.PRIM_TEXT_COLOR} style={{ margin: '0 .75rem 0 0' }} />
          Back
        </StyledButton>
      </div>
      <typography.p align="center" color={colors.SEC_TEXT_COLOR}>
        lars.tf
        {router.asPath.split('/').slice(1).map((x) =>
          <>
            <span> -{'>'} </span>
            <span>{x}</span>
          </>
        )}
      </typography.p>
    </Wrapper>
  )
}

const StyledButton = styled(Button)`
  padding: .5rem 1rem;
`;

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background: ${colors.SEC_BG};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

export default Navigation;