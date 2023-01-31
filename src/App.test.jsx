import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

describe('App Component', () => {
  test('renders Email label', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/email/i);
    expect(linkElement).toBeInTheDocument();
  });
})
