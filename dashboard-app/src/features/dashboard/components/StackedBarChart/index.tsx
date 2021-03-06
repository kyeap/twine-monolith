import React, { FunctionComponent, useState, useEffect, useCallback, useContext } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { equals } from 'ramda';
import { reduceValues } from 'twine-util/objects';
import { Duration } from 'twine-util';

import {
  flipActiveOfAll,
  updateLegendData,
  sortAndZeroOutInactiveData,
  isEveryDatumInactive
} from './utils/util';
import { DurationUnitEnum } from '../../../../types';
import { aggregatedToStackedGraph } from '../../dataManipulation/aggregatedToGraphData';
import { AggregatedData } from '../../dataManipulation/logsToAggregatedData';
import Legend from './Legend/index';
import Chart from './Chart';
import { LegendData } from './types';
import { TitleString } from '../Title';
import { DashboardContext } from '../../context';
import { TableTypeItem } from '../../dataManipulation/tableType';
import { GraphColoursEnum } from '../../../../lib/ui/design_system';


/*
 * Types
 */

interface Props {
  data: AggregatedData;
  xAxisTitle: string;
  yAxisTitle: string;
  title: TitleString;
  legendData: LegendData;
  setLegendData: React.Dispatch<React.SetStateAction<LegendData>>;
  colours?: GraphColoursEnum[];
  defaultSelection: boolean;
}


/*
 * Helpers
 */
const isCellDurationZero = (content: string | Duration.Duration) =>
  typeof content === 'object' ? Duration.equals(content, {}) : true;

const getNoActiveLegendText = (s: TableTypeItem['groupByX']) => {
  switch (s) {
    case 'Activity':
      return 'Select an activity to show data';

    case 'Volunteer Name':
      return 'Select volunteers to show their hours';

    case 'Project':
      return 'Select projects to show data';

    default:
      return 'Select legend items to show data';
  }
}

const getOverlayText = (data: AggregatedData, legendItemsActive: boolean): [boolean, string] => {
  const noActiveLegendText = getNoActiveLegendText(data.groupByX);

  const noData = data.rows.length === 0 || data.rows
    .every((row) => reduceValues((acc, content) => acc && isCellDurationZero(content), true, row))

  if (noData) {
    return [true, 'No data for this range']
  } else if (!legendItemsActive) {
    return [true, noActiveLegendText];
  } else {
    return [false, ''];
  }
};


/*
 * Components
 */
const StackedBarChart: FunctionComponent<Props> = (props) => {
  const { data, xAxisTitle, yAxisTitle, title, legendData, setLegendData, defaultSelection, colours } = props;
  const { unit } = useContext(DashboardContext);
  const [chartData, setChartData] = useState();
  const [tooltipUnit, setTooltipUnit] = useState('');

  const setLegendActivityOnUpdate = (id: number) => () =>
    setLegendData((prevState: LegendData) =>
      prevState.map((x) =>
        x.id === id
          ? { ...x, active: !x.active }
          : x
      ));

  const setLegendActivityOfAll = useCallback(() => {
    setLegendData(flipActiveOfAll);
  }, [setLegendData]);

  useEffect(() => {
    const newLegendData = updateLegendData(data, legendData, defaultSelection);
    const zeroedOutData = sortAndZeroOutInactiveData(data, newLegendData);
    if (!equals(legendData, newLegendData)) {
      setLegendData(newLegendData);
    }
    setChartData(aggregatedToStackedGraph(zeroedOutData, unit, colours));
  }, [data, setLegendData, setChartData, unit, defaultSelection, legendData, colours]);

  useEffect(() => {
    const zeroedOutData = sortAndZeroOutInactiveData(data, legendData);
    setChartData(aggregatedToStackedGraph(zeroedOutData, unit, colours));
  }, [colours, data, legendData, unit]);

  useEffect(() => {
    setTooltipUnit(unit === DurationUnitEnum.DAYS ? 'days' : 'hrs');
  }, [unit]);

  const [isVisible, overlayText] = getOverlayText(data, !isEveryDatumInactive(legendData));

  const chartProps = {
    data: chartData,
    xAxisTitle,
    yAxisTitle,
    title,
    tooltipUnit,
    overlayText,
    isVisible,
  };

  const legendProps = {
    legendData,
    setLegendActivityOfAll,
    setLegendActivityOnUpdate,
    title: data.groupByX,
    defaultSelection,
    colours,
  };

  return (
    <Row center="xs">
      <Col xs={9}>
        <Chart {...chartProps} />
      </Col>
      <Col xs={3}>
        <Legend {...legendProps} />
      </Col>
    </Row>
  );
};

export default StackedBarChart;
