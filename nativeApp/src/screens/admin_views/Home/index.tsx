import React, { FC } from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { Heading as H } from '../../../lib/ui/typography';
import { ColoursEnum } from '../../../lib/ui/colours';
import Stat from '../../../lib/ui/Stat';
import Line from '../../../lib/ui/Line';

/*
 * Types
 */
type Props = {
}

/*
 * Styles
 */
const View = styled.View`
  flexDirection: column;
  alignItems: center;
  paddingTop: 20;
  paddingBottom: 20;
  paddingLeft: 40;
  paddingRight: 40;
  flex: 1;
`;

const Heading = styled(H)`
  flexGrow: 0;
`;

const Container = styled.View`
  width: 100%;
  flexGrow: 1;
  justifyContent: space-between;
`;


/*
 * Component
 */
const AdminHome: FC<Props> = () => (
  <View>
    <Heading>Week Stats</Heading>
    <Container>
      <Stat
        heading="NUMBER OF VOLUNTEERS"
        value="6"
        unit="people"
      >
        <MaterialIcons name="person-outline" outline size={35} color={ColoursEnum.mustard} />
      </Stat>
      <Line />
      <Stat
        heading="TOTAL TIME GIVEN"
        value="109"
        unit="hours"
      >
        <MaterialCommunityIcons name="clock-outline" outline size={35} color={ColoursEnum.mustard} />
      </Stat>
      <Line />
      <Stat
        heading="AVERAGE DURATION"
        value="120"
        unit="minutes"
      >
        <MaterialCommunityIcons name="timer" outline size={35} color={ColoursEnum.mustard} />
      </Stat>
    </Container>
  </View>
);

export default AdminHome;