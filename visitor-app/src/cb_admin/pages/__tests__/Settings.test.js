import 'jest-dom/extend-expect';
import { cleanup, waitForElement, wait, fireEvent } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { renderWithRouter } from '../../../tests';
import Settings from '../Settings';
import { axios } from '../../../api';

describe('Settings Component', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(cleanup);

  test(':: succesful load displays cbs details on page', async () => {
    expect.assertions(3);

    mock.onGet('/sectors').reply(200, { result: [{ id: 1, name: 'Energy' }, { id: 2, name: 'Cafe' }, { id: 3, name: 'Other' }] });
    mock.onGet('/community-businesses/me')
      .reply(200, { result: {
        id: 3,
        name: 'Frog Finders',
        sector: 'Environment or nature',
        logoUrl: null,
        date: '2017-05-15T12:24:56.000Z',
      } });
    mock.onGet('/users/me')
      .reply(200, { result: { email: 'findmyfroggy@frogfinders.com' } });

    const { getByText } = renderWithRouter()(Settings);
    const [title, cbType, email] = await waitForElement(() => [
      getByText('Frog Finders'),
      getByText('Environment or nature'),
      getByText('findmyfroggy@frogfinders.com'),
    ]);
    expect(title).toHaveTextContent('Frog Finders');
    expect(cbType).toHaveTextContent('Environment or nature');
    expect(email).toHaveTextContent('findmyfroggy@frogfinders.com');
  });

  test(':: unauthorised request redirects to ', async () => {
    expect.assertions(1);

    mock.onGet('/community-businesses/me')
      .reply(401, { result: null });

    const { history } = renderWithRouter()(Settings);

    await wait(() => expect(history.location.pathname).toEqual('/login'));
  });

  test(':: update CB details successful updates fields', async () => {
    mock.onGet('/community-businesses/me')
      .reply(200, { result: {
        id: 3,
        name: 'Frog Finders',
        sector: 'Environment or nature',
        logoUrl: null,
        date: '2017-05-15T12:24:56.000Z',
      } });
    mock.onPut('/community-businesses/me')
      .reply(200, { result: {
        id: 3,
        name: 'Frog Minders',
        sector: 'Environment or nature',
        logoUrl: null,
        date: '2017-05-15T12:24:56.000Z',
      } });
    mock.onGet('/users/me')
      .reply(200, { result: { email: 'findmyfroggy@frogfinders.com' } });
    mock.onPut('/users/me')
      .reply(200, { result: { email: 'mindmyfroggy@frogminders.com' } });

    const { getByLabelText, getByText } = renderWithRouter()(Settings);

    const [businessNameInput, emailInput, submitBtn] = await waitForElement(() => [
      getByLabelText('Business name'),
      getByLabelText('Email'),
      getByText('SAVE'),
    ]);

    fireEvent.change(businessNameInput, { target: { value: 'Frog Minders' } });
    fireEvent.change(emailInput, { target: { value: 'mindmyfroggy@frogminders.com' } });
    fireEvent.click(submitBtn);

    const [name, email] = await waitForElement(() => [
      getByText('Frog Minders'),
      getByText('mindmyfroggy@frogminders.com'),
    ]);

    expect(name).toBeDefined();
    expect(email).toBeDefined();
  });

  test(':: update CB details fails does not update fields', async () => {
    mock.onGet('/community-businesses/me')
      .reply(200, { result: {
        id: 3,
        name: 'Frog Finders',
        sector: 'Environment or nature',
        logoUrl: null,
        date: '2017-05-15T12:24:56.000Z',
      } });
    mock.onPut('/community-businesses/me')
      .reply(400, { result: null, error: { name: 'Invalid name' } });
    mock.onGet('/users/me')
      .reply(200, { result: { email: 'findmyfroggy@frogfinders.com' } });
    mock.onPut('/users/me')
      .reply(400, { result: null, error: { email: 'Invalid email' } });

    const { getByLabelText, getByText } = renderWithRouter()(Settings);

    const [businessNameInput, emailInput, submitBtn] = await waitForElement(() => [
      getByLabelText('Business name'),
      getByLabelText('Email'),
      getByText('SAVE'),
    ]);

    fireEvent.change(businessNameInput, { target: { value: 'Frog Minders' } });
    fireEvent.change(emailInput, { target: { value: 'mindmyfroggy@frogminders.com' } });
    fireEvent.click(submitBtn);

    const [nameError] = await waitForElement(() => [
      getByText('Invalid email'),
    ]);

    expect(nameError).toBeDefined();
  });

  test.skip(':: successfully upload image to Cloudinary', async () => {});
  test.skip(':: fail to upload image to Cloudinary', async () => {});
  test.skip(':: generate CSV export', async () => {});
});
