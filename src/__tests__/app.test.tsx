import {screen, render, fireEvent} from '@testing-library/react';

import { App } from '../app';

const mockedUsers = {
  results: [
    {
      email: 'some@email.com',
      id: {
        name: 'some id name',
        value: 'some id value',
      }
    }
  ]
}
describe('App component', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  // test('renders app component', async () => {
  //   const { container } = render(<App />);
  //
  //   expect(await screen.findByTestId('iterator-container')).toBeInTheDocument();
  //   expect(container).toMatchSnapshot();
  // });

  test('renders user email', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedUsers));
    render(<App />);
    expect(await screen.findByText('some@email.com')).toBeInTheDocument()
  })

  test('renders user emails when more then 1', async () => {
    fetchMock
        .once(JSON.stringify(mockedUsers))
        .once(JSON.stringify({
          results: [
            {
              email: 'someOther@email.com',
              id: {
                name: 'some other id name',
                value: 'some other id value',
              }
            }
          ]
        }));
    render(<App />);
    expect(await screen.findByText('some@email.com')).toBeInTheDocument();
    const nextBtn = screen.getByTestId('next-btn')
    fireEvent.click(nextBtn)
    expect(await screen.findByText('someOther@email.com')).toBeInTheDocument();
  })

  //test('renders error when API call fails', async () => {})
})
