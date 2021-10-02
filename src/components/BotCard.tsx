import styled from 'styled-components';
import Image from 'next/image';
import router from 'next/router';

import { colors, typography } from '../constants';
import { Bot } from '../types';

const BotCard: React.FC<Bot> = ({ user, approximate_server_count, description, name, isPrivate }) => {
  function redirectTo(url: string) {
    router.push(url);
  }

  return (
    <Card>
      <Content>
        <User>
          <Avatar src={user.avatar_url} alt={`${user.username}'s avatar'`} width={70} height={70}  />
          <UserDetails>
            <Username>
              {user.username}
              <span>#{user.discriminator}</span>
            </Username>
            {approximate_server_count &&
              <typography.p>{approximate_server_count} servers</typography.p>
            }
          </UserDetails>
        </User>
        <typography.p margin="1rem 0 0 0">{description}</typography.p>
      </Content>
      <ButtonWrapper>
        <Button onClick={() => redirectTo(`/bots/${name}`)} width={isPrivate ? '100%' : undefined}>Details</Button>
        {!isPrivate &&
          <Button onClick={() => redirectTo(`/bots/${name}/invite`)}>Invite</Button>
        }
      </ButtonWrapper>
    </Card>
  )
}

const Card = styled.div`
  border-radius: 8px;
  border: 1px solid ${colors.LOW_OPACITY};
  // max-width: 248px;
  width: 100%;
  transition: background 200ms ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    background: ${colors.SEC_BG};
  }
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Username = styled(typography.h3)`
  font-size: 1.8rem;
  font-weight: 500;
  
  span {
    color: ${colors.SEC_TEXT_COLOR};
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Avatar = styled(Image)`
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled('button')<{ width?: string }>`
  width: ${({ width }) => width || '50%'};
  border: none;
  background: none;
  font-size: 1.4rem;
  padding: 1.5rem 0;
  color: ${colors.SEC_TEXT_COLOR};
  font-weight: 400;
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, .03);
    color: ${colors.PRIM_TEXT_COLOR};
  }
`;

export default BotCard;