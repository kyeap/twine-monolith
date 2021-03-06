import MockAdapter from 'axios-mock-adapter';
import MockDate from 'mockdate';
import { axios } from '../../../../../api';
import { DateRangesEnum } from '../dateRange';
import { getVisitorData } from '../data';


describe('Visits Dashboard Data Processing', () => {
  const mock = new MockAdapter(axios);

  afterAll(() => {
    MockDate.reset();
    mock.restore();
  });

  describe('getVisitorData', () => {
    test(`Time: ${DateRangesEnum.LAST_12_MONTHS}, Age: All, Gender: All, Activity: All`, async () => {
      MockDate.set('2019-10-31T23:59:59.999Z');

      mock.onGet('/community-businesses/me/visitors')
        .reply(200, {
          result: [
            {
              id: 1,
              name: 'Jom',
              gender: 'male',
              birthYear: 1989,
              visits: [
                { id: 1, visitActivity: 'yoga', category: 'sport', createdAt: '2019-10-19T11:00:00.000Z' },
                { id: 2, visitActivity: 'running', category: 'sport', createdAt: '2019-10-29T11:00:00.000Z' },
              ],
            },
            {
              id: 2,
              name: 'Bom',
              gender: 'female',
              birthYear: 1955,
              visits: [
                { id: 3, visitActivity: 'painting', category: 'art', createdAt: '2019-10-09T11:00:00.000Z' },
                { id: 4, visitActivity: 'running', category: 'sport', createdAt: '2019-10-21T11:00:00.000Z' },
              ],
            },
            {
              id: 2,
              name: 'Mom',
              gender: 'female',
              birthYear: null,
              visits: [
                { id: 5, visitActivity: 'yoga', category: 'sport', createdAt: '2019-10-09T11:00:00.000Z' },
                { id: 6, visitActivity: 'running', category: 'sport', createdAt: '2019-10-21T11:00:00.000Z' },
              ],
            },
          ],
          meta: { count: 1 },
        });

      mock.onGet('/community-businesses/me/visit-activities')
        .reply(200, {
          result: [
            {
              id: 1,
              name: 'yoga',
              category: 'sport',
            },
            {
              id: 2,
              name: 'running',
              category: 'sport',
            },
            {
              id: 3,
              name: 'painting',
              category: 'art',
            },
          ],
        });

      const res = await getVisitorData({ time: DateRangesEnum.LAST_12_MONTHS });

      expect(res).toEqual({
        charts: {
          category: { stepSize: 1 },
          time: { stepSize: 1 },
        },
        data: {
          age: {
            datasets: [{ data: [1, 1, 1],
              backgroundColor: ['#6370BC', '#379A90', '#D7E360'],
              label: undefined }],
            labels: ['18-34', '51-69', 'Prefer not to say'],
          },
          activity: {
            sport: {
              datasets: [{ data: [2, 3], backgroundColor: '#833FF7', label: undefined }],
              labels: ['yoga', 'running'],
            },
            art: {
              datasets: [{ data: [1], backgroundColor: '#833FF7', label: undefined }],
              labels: ['painting'],
            },
          },
          gender: {
            datasets: [{ data: [1, 2], backgroundColor: ['#47ABFA', '#6370BC'], label: undefined }],
            labels: ['Male', 'Female'],
          },
          time: {
            datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], backgroundColor: '#833FF7', label: undefined }],
            labels: [
              'Nov 2018',
              'Dec 2018',
              'Jan 2019',
              'Feb 2019',
              'Mar 2019',
              'Apr 2019',
              'May 2019',
              'Jun 2019',
              'Jul 2019',
              'Aug 2019',
              'Sep 2019',
              'Oct 2019',
            ],
          },
          category: {
            datasets: [{ data: [3, 1], backgroundColor: '#833FF7', label: undefined }],
            labels: ['sport', 'art'],
          },
        },
      });
    });
  });
});
