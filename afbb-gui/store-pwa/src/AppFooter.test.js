import { render, screen } from '@testing-library/react';
import './AppFooter';
import AppFooter from './AppFooter';

it('renders copy right', () => {
  render(<AppFooter />);
  const footer = screen.getByText('sunshine55');
  expect(footer).toHaveAttribute('href', 'https://github.com/sunshine55?tab=repositories');
});