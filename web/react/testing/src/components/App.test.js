import { getByText, render, screen } from '@testing-library/react';
import App from  '../RouteSwitch';
import userEvent from "@testing-library/user-event";


/* window.fetch = jest.fn(() => {
  const user = { name: 'Jack', email: 'jack@email.com' };

  return Promise.resolve({
    json: () => Promise.resolve(user),
  });
}); */

describe('Renders and . . .',  () => {

  it('Matches the snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('Display the button names correctly', () => {
    render(<App />);
    screen.getByText('Other Hooks');
    screen.getByRole('button', {name: 'useEffect'});
  });

  it('Displays all buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toEqual(6);
  });

  it('Changes the component', () => {
    render(<App />);
    const customButton = screen.getByRole('button', {name: 'customHook'});
    userEvent.click(customButton);
    expect(global.location.pathname).toEqual('/customHook');
    screen.getByText('Saved Text');
  });
});