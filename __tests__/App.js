import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from 'react-native-testing-library';

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should match snapshot', () => {
    const TestApp = render(<App />).toJSON();
    expect(TestApp).toMatchSnapshot();
  });
});