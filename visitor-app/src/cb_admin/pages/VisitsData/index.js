import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { assocPath, compose } from 'ramda';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LabelledSelect from '../../../shared/components/form/LabelledSelect';
import { Form as F } from '../../../shared/components/form/base';
import { Heading3 } from '../../../shared/components/text/base';
import NavHeader from '../../../shared/components/NavHeader';
import { TabGroup } from '../../components/Tabs';
import TimePeriodChart from './charts/TimePeriodChart';
import GenderChart from './charts/GenderChart';
import AgeGroupChart from './charts/AgeGroupChart';
import CategoriesChart from './CategoriesChart';
import CsvExportButton from './CsvExportButton';
import DateRanges from './dateRange';
import { ErrorUtils, Visitors, Activities } from '../../../api';
import { renameKeys, redirectOnError } from '../../../util';
import { AgeRange, Gender } from '../../../shared/constants';
import { AgeGroups } from './util';
import { getVisitorData, getVisitsData } from './data';


const Form = styled(F)`
  width: 100%;
`;

const Spacer = styled.p`
  margin: 0.4em;
`;

const BottomSpacer = styled.div`
  height: 6rem;
`;

const H3 = styled(Heading3)`
  font-weight: bold;
`;

const BottomChartRow = styled(Row)`
  margin-top: 2em;
`;

const ageOptions = AgeGroups.toSelectOptions();
const timeOptions = DateRanges.toSelectOptions();

const BasisType = {
  Visits: 'Visits',
  Visitors: 'Visitors',
};


export default class VisitsDataPage extends React.Component {
  state = {
    basis: BasisType.Visits,
    data: {
      gender: {},
      age: {},
      time: {},
      activity: {},
      category: {},
    },
    charts: {
      category: { stepSize: 2 },
      time: { stepSize: 2 },
    },
    options: {
      genders: [],
      activities: [],
    },
    filters: {
      gender: '',
      age: undefined,
      time: timeOptions[0].value,
      activity: '',
    },
    errors: {},
  }

  componentDidMount() {
    Promise.all([
      Visitors.genders(),
      Activities.get(),
      this.getData(),
    ])
      .then(([genderRes, activityRes]) => {
        const genderOpts = genderRes.data.result
          .map(({ name, ...rest }) => ({ ...rest, name: Gender.toDisplay(name) }))
          .map(renameKeys({ id: 'key', name: 'value' }));

        const activityOpts = activityRes.data.result
          .map(renameKeys({ id: 'key', name: 'value' }));

        this.setState(
          compose(
            assocPath(['options', 'genders'], [{ key: 0, value: 'All' }].concat(genderOpts)),
            assocPath(['options', 'activities'], [{ key: 0, value: 'All' }].concat(activityOpts)),
          ),
        );
      })
      .catch(error => redirectOnError(this.props.history.push, error, { 403: '/admin/confirm' }));
  }

  onChange = (e) => {
    const path = e.target.name === 'basis'
      ? [e.target.name]
      : e.target.name.split('.');

    if (e.target.value === 'All') {
      return this.setState(assocPath(path, undefined), this.getData);
    }

    const value = this.normaliseFormValues(e.target.name, e.target.value);

    return this.setState(assocPath(path, value), this.getData);
  };

  onExportError = (error) => {
    if (ErrorUtils.errorStatusEquals(error, 401)) {
      this.props.history.push('/admin/confirm');
    } else if (ErrorUtils.errorStatusEquals(error, 500)) {
      this.props.history.push('/error/500');
    } else {
      this.setState({ errors: { general: 'Could not create CSV' } });
    }
  };

  getData = () =>
    (this.state.basis === BasisType.Visits
      ? getVisitsData(this.state.filters, this.state.charts)
      : getVisitorData(this.state.filters, this.state.charts)
    )
      .then(data => this.setState(data))
      .catch(err => redirectOnError(this.props.history.push, err))

  normaliseFormValues = (name, value) => {
    switch (name) {
      case 'filters.age':
        return value && AgeRange.fromStr(value);

      case 'filters.gender':
        return Gender.fromDisplay(value);

      default:
        return value;
    }
  }

  render() {
    const { state } = this;
    const { errors } = state;
    const { since, until } = DateRanges.toDates(this.state.filters.time);

    return (
      <Grid>
        <NavHeader
          leftTo="/admin"
          leftContent="Back to dashboard"
          centerContent="Visits data"
        />
        <Row center="xs">
          <Form onChange={this.onChange} onSubmit={e => e.preventDefault()}>
            <Col xs={2}>
              <LabelledSelect
                id="visits-data-time-period"
                name="filters.time"
                label="Date range"
                options={timeOptions}
                errors={errors.time}
              />
            </Col>
            <Col xs={2}>
              <LabelledSelect
                id="visits-data-data-points"
                name="basis"
                label="Data points"
                value={state.basis}
                options={[{ key: '0', value: BasisType.Visits }, { key: '1', value: BasisType.Visitors }]}
              />
            </Col>
            <Col xs={2}>
              <LabelledSelect
                id="visits-data-gender"
                name="filters.gender"
                label="By gender"
                options={state.options.genders}
                errors={errors.gender}
              />
            </Col>
            <Col xs={2}>
              <LabelledSelect
                id="visits-data-age"
                name="filters.age"
                label="By age group"
                options={ageOptions}
                errors={errors.age}
              />
            </Col>
            <Col xs={3}>
              <LabelledSelect
                id="visits-data-activity"
                name="filters.activity"
                label="By activity"
                options={state.options.activities}
                errors={errors.activity}
              />
            </Col>
            <Col xs={1}>
              <Spacer />
              <CsvExportButton
                filters={state.filters}
                onError={this.onExportError}
              >
                Export
              </CsvExportButton>
            </Col>
          </Form>
        </Row>
        <Row>
          <Col>
            <Heading3>
              {moment(since).format('DD MMM YYYY')} - {moment(until).format('DD MMM YYYY')}
            </Heading3>
          </Col>
        </Row>
        <TabGroup titles={['Numbers', 'Demographics']}>
          <Grid>
            <Row center="xs">
              <Col xs={8}>
                <H3>{this.state.basis} over {this.state.filters.time.toLowerCase()}</H3>
                <TimePeriodChart data={this.state.data.time} options={this.state.charts.time} />
              </Col>
            </Row>
            <BottomChartRow center="xs">
              <Col xs={8}>
                <H3>Reason for visiting</H3>
                <CategoriesChart
                  categoryData={state.data.category}
                  activityData={state.data.activity}
                  chartOptions={state.charts.category}
                  basis={state.basis}
                />
              </Col>
            </BottomChartRow>
          </Grid>
          <Grid>
            <Row center="xs">
              <Col xs={6}>
                <H3>{state.basis} by gender</H3>
                <GenderChart data={state.data.gender} />
              </Col>
            </Row>
            <BottomChartRow center="xs">
              <Col xs={6}>
                <H3>{state.basis} by age</H3>
                <AgeGroupChart data={state.data.age} />
              </Col>
            </BottomChartRow>
          </Grid>
        </TabGroup>
        <Row>
          <BottomSpacer />
        </Row>
      </Grid>
    );
  }
}

VisitsDataPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};