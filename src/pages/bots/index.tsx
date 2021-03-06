import { NextPage } from 'next';
import styled from 'styled-components';

import BotCard from '../../components/BotCard';
import NextHead from '../../components/NextHead';
import { colors, layout, typography } from '../../constants';
import core from '../../core';
import { Bot } from '../../types';

const BotIndex: NextPage<{ bots: Bot[] }> = ({ bots }) => {
  return (
    <>
      <NextHead>
        <title>Bots - lars.tf</title>
      </NextHead>
      <layout.container>
        <typography.h1 size="4rem" margin="2rem 0 1rem 0">Bots</typography.h1>
        <Category>
          <Label>Public bots</Label>
          <Wrapper>
            {bots.filter((b) => !b.isPrivate).map((bot) =>
              <BotCard {...bot} key={bot.user.id} />
            )}
          </Wrapper>
        </Category>
        <Category>
          <Label>Private bots</Label>
          <Wrapper>
            {bots.filter((b) => b.isPrivate).map((bot) =>
              <BotCard {...bot} key={bot.user.id} />
            )}
          </Wrapper>
        </Category>
      </layout.container>
    </>
  )
}

export async function getServerSideProps() {
  const response = await core.api.get('bots?with_counts=true');

  return {
    props: {
      bots: response.status === 200
        ? response.data
        : null,
    }
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 368px));
  
  @media only screen and (max-width: calc(368px * 2)) {
    gap: 1.75rem;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Label = styled(typography.h3)`
  text-transform: uppercase;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  color: ${colors.SEC_TEXT_COLOR};
`;

const Category = styled.div`
  margin-bottom: 4rem;
`;

export default BotIndex;