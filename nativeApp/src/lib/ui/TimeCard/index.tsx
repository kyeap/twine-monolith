import React, { FC } from 'react';
import styled from 'styled-components/native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import CardWithButtons from '../CardWithButtons';

import { ColoursEnum } from '../colours';
import { FontsEnum } from '../typography';
import HoursAnMinutesText from '../HoursAndMinutesText';
import { DeleteButtonConfig } from '../CardWithButtons/types';


/*
 * Types
 */
type Props = {
  id: number;
  volunteer?: string;
  timeValues: [number, number];
  date: string;
  labels: [string, string];
  onDelete: () => void;
}

/*
 * Styles
 */
const DetailsContainer = styled.View<{topPadding: boolean}>`
  ${({ topPadding }) => topPadding && 'marginTop: 5;'}
  flexDirection: row;
  alignItems: flex-end;
`;

const LabelContainer = styled.View`
  flexDirection: column;
  flex: 1;
`;

const Label = styled.Text<{bold?: boolean; textAlign: string}>`
  textAlign: ${(props) => props.textAlign};
  color: ${ColoursEnum.darkGrey};
  fontFamily: ${(props) => (props.bold ? FontsEnum.medium : FontsEnum.light)}
  fontSize: 15;
  letterSpacing: 1.2;
  paddingBottom: 6;
`;

/*
 * Component
 */
const TimeCard: FC<NavigationInjectedProps & Props> = (props) => {
  const {
    timeValues, date, labels, volunteer, navigation, onDelete,
  } = props;

  const buttonConfig: DeleteButtonConfig = {
    buttonType: 'delete',
    onDelete,
    onEdit: () => { navigation.navigate('AdminEditTime'); },
  };
  return (
    <CardWithButtons buttonConfig={buttonConfig}>
      <HoursAnMinutesText align="left" timeValues={timeValues} />
      <DetailsContainer topPadding={Boolean(volunteer)}>
        <LabelContainer>
          <Label textAlign="left">{date}</Label>
          {volunteer && <Label textAlign="left" bold>{volunteer}</Label>}
        </LabelContainer>
        <LabelContainer>
          <Label textAlign="right" bold>{labels[0]}</Label>
          <Label textAlign="right" bold>{labels[1]}</Label>
        </LabelContainer>
      </DetailsContainer>
    </CardWithButtons>
  );
};

export default withNavigation(TimeCard);