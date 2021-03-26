jest.useFakeTimers()
import 'react-native';
import React from 'react';
import SelectTeams from '../src/screens/SelectTeams/SelectTeams';
import { NavigationContainer } from '@react-navigation/native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';


describe('<SelectTeams />', () => {
    it('renders correctly', () => {
        renderer.create(
            <NavigationContainer>
                <SelectTeams />
            </NavigationContainer>
        );
    });

    it('should match snapshot',() => {
        const mockFunction = jest.fn();
        const TestSelectTeams = render(<SelectTeams fetchTeamRoster={mockFunction} countColleges={mockFunction} />).toJSON();
        expect(TestSelectTeams).toMatchSnapshot();
    });

    it('navigates to Results screen', () => {
        const navigate = jest.fn();

        const { getByText } = render(
            <NavigationContainer>
                <SelectTeams
                    navigation={{ navigate }}
                />
            </NavigationContainer>
        );
        fireEvent.press(getByText('Scout >>'));
        expect(navigate).toHaveBeenCalled();
    });

});