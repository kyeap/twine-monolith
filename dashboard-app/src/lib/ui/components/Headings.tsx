import styled from 'styled-components';
import { ColoursEnum, Fonts, MediaQueriesEnum } from '../design_system';

export const H1 = styled.h1`
  font-size: ${Fonts.size.heading1};
  font-weight: ${Fonts.weight.light};
  color: ${ColoursEnum.black};
  text-align: center;
  margin-bottom: 1.5rem;

  ${MediaQueriesEnum.standardDesktop}{
    font-size: ${Fonts.size.heading2}
}
`;

export const H2 = styled.h2`
  font-size: ${Fonts.size.heading2};
  font-weight: ${Fonts.weight.light};
  color: ${ColoursEnum.black};
  text-align: center;
  margin-bottom: 1.5rem;

  ${MediaQueriesEnum.standardDesktop}{
    font-size: ${Fonts.size.heading3}
}
`;

export const H3 = styled.h3`
  font-size: ${Fonts.size.heading3};
  font-weight: ${Fonts.weight.light};
  color: ${ColoursEnum.black};
  text-align: center;
  margin-bottom: 1.5rem;

  ${MediaQueriesEnum.standardDesktop}{
    font-size: 1.4rem
}
`;

export const H4 = styled.h4`
  font-size: ${Fonts.size.heading4};
  font-weight: ${Fonts.weight.light};
  color: ${ColoursEnum.black};
  text-align: center;
  margin-bottom: 1.5rem;
`;
