import styled from 'react-emotion';
import { lighten } from 'polished';

export const GameChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessagesWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
  height: 30vh;
  &:empty {
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: 'Be the first in the chat!';
      color: ${props => props.theme.colors.secondaryText};
      display: block;
    }
  }
`;

export const MessageItemWrapper = styled.div`
  padding: 5px;
  display: flex;
`;
export const UserIdWrapper = styled.div`
  align-self: flex-end;
  margin-top: 20px;
  height: 40px;
  width: 40px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
`;
export const MessageWrapper = styled.div`
  align-self: flex-start;
  flex-grow: 1;
  margin-bottom: 20px;
  margin-left: 10px;
  background-color: ${props => lighten(0.1, props.theme.colors.background)};
  padding: 15px;
  border-radius: 10px;
`;
