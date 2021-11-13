import { NextPage } from 'next';
import styled from 'styled-components';

import NextHead from '../components/NextHead';
import { colors, typography } from '../constants';
import core from '../core';

const Index: NextPage<{ views: number }> = ({ views }) => {
  return (
    <>
      <NextHead>
        <title>lars.tf</title>
      </NextHead>
      <Wrapper>
        <TextWrapper>
          <Text>i am file number {views}.</Text>
          <Text>i am a unique piece of art.</Text>
          <Text>i was just created and will be gone in a few seconds.</Text>
          <Text>you own me now until you forget about me.</Text>
        </TextWrapper>
      </Wrapper>
    </>
  )
}

export async function getServerSideProps() {
  const response = await core.api.get('stats');

  if (response.status === 200)
    return {
      props: {
        views: response.data.views,
      }
    };

  return {
    props: {
      views: 0,
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: flex-end;
`;

const TextWrapper = styled.div`
  padding: 5rem 2.5rem;
`;

const Text = styled(typography.p)`
  font-family: 'Courier New', Courier, monospace;
  color: ${colors.PRIM_TEXT_COLOR};
  font-size: 1.8rem;
`;

export default Index;