import { aggregatedToCsv } from '../aggregatedToCsv';
import { DurationUnitEnum } from '../../../types';
import { Duration } from 'twine-util';

describe('aggregatedToCsv', () => {
  test('SUCCESS - returns string in csv format', async () => {
    const unit = DurationUnitEnum.HOURS;
    const data = {
      headers: ['Activity', 'February 2018', 'March 2018', 'April 2018'],
      rows: [
        {
          Activity: 'Digging Holes',
          'February 2018': Duration.fromSeconds(0),
          'March 2018': Duration.fromSeconds(120),
          'April 2018': Duration.fromSeconds(0),
        },
        {
          Activity: 'Outdoor and practical work',
          'February 2018': Duration.fromSeconds(0),
          'March 2018': Duration.fromSeconds(213),
          'April 2018': Duration.fromSeconds(11112),
        },
      ],
    };
    const expected = await aggregatedToCsv(data, unit);
    expect(expected).toEqual(`Activity,Feb 18,Mar 18,Apr 18,Total Hours
Digging Holes,0,0.03,0,0.03
Outdoor and practical work,0,0.06,3.09,3.15`);
  });

  test('SUCCESS - returns string in csv format in correct units', async () => {
    const unit = DurationUnitEnum.DAYS;
    const data = {
      headers: ['Activity', 'February 2018', 'March 2018', 'April 2018'],
      rows: [
        {
          Activity: 'Digging Holes',
          'February 2018': Duration.fromSeconds(0),
          'March 2018': Duration.fromSeconds(12000),
          'April 2018': Duration.fromSeconds(0),
        },
        {
          Activity: 'Outdoor and practical work',
          'February 2018': Duration.fromSeconds(0),
          'March 2018': Duration.fromSeconds(2130),
          'April 2018': Duration.fromSeconds(11112),
        },
      ],
    };
    const expected = await aggregatedToCsv(data, unit);
    expect(expected).toEqual(`Activity,Feb 18,Mar 18,Apr 18,Total Days
Digging Holes,0,0.42,0,0.42
Outdoor and practical work,0,0.07,0.39,0.46`);
  });
});