import React from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons, Entypo, EvilIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';

import { colors } from '../../utils/constants';

const Root = styled.View`
  height: 40;
  flexDirection: row;
`;

const Botton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
  paddingHorizontal: 32px;
`;

const BottonText = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const isFavorited = false;

const FeedCardBottom = ({ favoriteCount }) =>
  <Root>
    <Botton>
      <SimpleLineIcons name="bubble" size={18} color={colors.LIGHT_GRAY} />
      <BottonText>
        {favoriteCount}
      </BottonText>
    </Botton>
    <Botton>
      <EvilIcons name="retweet" color={colors.LIGHT_GRAY} size={25} />
      <BottonText>
        {favoriteCount}
      </BottonText>
    </Botton>
    <Botton>
      <Entypo
        name={isFavorited ? 'heart' : 'heart-outlined'}
        color={isFavorited ? 'red' : colors.LIGHT_GRAY}
        size={20}
      />
      <BottonText>
        {favoriteCount}
      </BottonText>
    </Botton>
  </Root>;

export default FeedCardBottom;
