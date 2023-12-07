import {screen, render} from '@testing-library/react';

import { App } from '../app';

test('renders app component', () => {
  const { container } = render(<App />);

  expect(screen.getByTestId('iterator-container')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
