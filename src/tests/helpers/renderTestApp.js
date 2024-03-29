/* import { render } from '@testing-library/react';
import { createReduxStore } from '../../store/store';
import { Provider } from 'react-redux';
import AppRouter from '../../router/AppRouter';
import { MemoryRouter } from 'react-router-dom';

export const renderTestApp = (component, options) => {
  const store = createReduxStore(options?.initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route]}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </Provider>
  );
}; */

import { render } from '@testing-library/react';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const renderTestApp = (component) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};
