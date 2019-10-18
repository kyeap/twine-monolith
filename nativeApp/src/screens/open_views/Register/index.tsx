import React from 'react';
import styled from 'styled-components/native';
import { Picker } from 'react-native';

import { CommunityBusinesses } from '../../../lib/api';
import useRequest from '../../../lib/hooks/requestHook';
import { Heading } from '../../../lib/ui/typography';
import Page from '../../../lib/ui/Page';

/*
 * Types
 */
type Props = {
}

/*
 * Styles
 */

const StyledPicker = styled.Picker`
  width: 200;
  height: 40;
`;

const Text = styled.Text`
  font-size: 15;
`;

/*
 * Component
 */
export default function Register() {
  const [data, error] = useRequest(CommunityBusinesses.getVolunteerActivities);

  return (
    <Page heading="Register">
      <Heading>Register</Heading>
      <StyledPicker>
        {data && data.map((x) => <Picker.Item key={x.id} label={x.name} value={x.name} />)}
      </StyledPicker>
      {error && <Text>{JSON.stringify(error)}</Text>}
    </Page>
  );
}
