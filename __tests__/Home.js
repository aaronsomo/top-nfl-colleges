import 'react-native';
import React from 'react';
import Home from '../src/screens/Home/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

describe('<Home />', () => {
    it('renders correctly', () => {
        renderer.create(<Home />);
    });

    it('should match snapshot', () => {
        const TestHome = render(<Home />).toJSON();
        expect(TestHome).toMatchSnapshot();
    });

    it('navigates to SelectTeams screen', () => {
        const navigate = jest.fn();
        const { getByText } = render(<Home navigation={{ navigate }} />);
        fireEvent.press(getByText('Select Teams >>'));
        expect(navigate).toHaveBeenCalledWith('SelectTeams');
    });

});