import { render, screen, waitFor } from '@testing-library/react';
import AppBody from './AppBody';

const categories = [{
  id: 'c1',
  name: 'dairy',
  items: [{
    name: 'milk',
    price: 1.7,
    description: 'semi skimmed (1L)',
  }, {
    name: 'cheese',
    price: 2.39,
    description: 'mild cheddar (330g)',
  }, {
    name: 'butter',
    price: 1.09,
    description: 'unsalted (250g)',
  }, {
    name: 'eggs',
    price: 1.76,
    description: 'medium sized (6 eggs)',
  }]
}];

beforeEach(() => fetch.resetMocks());

it('renders list of categories', async () => {
  fetch.mockResponseOnce(JSON.stringify(categories));
  render(<AppBody />);
  await waitFor(() => {
    expect(screen.getAllByRole('listitem').length).toBe(1);
  });
});
