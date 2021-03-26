jest.useFakeTimers();
import 'react-native';
import React from 'react';
import Results from '../src/screens/Results/Results';
import { NavigationContainer } from '@react-navigation/native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';

describe('<Results />', () => {
    it('renders correctly', () => {
        const params = {
            sortedColleges: [
                {
                    name: 'CollegeA',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 10,
                },
                {
                    name: 'CollegeB',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Tigers',
                    count: 8,
                },
                {
                    name: 'CollegeC',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Bears',
                    count: 6,
                },
                {
                    name: 'CollegeD',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Oh My',
                    count: 4,
                },
                {
                    name: 'CollegeE',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 2,
                }
            ]
        };

        renderer.create(
            <NavigationContainer>
                <Results route={{ params }} />
            </NavigationContainer>
        );
    });

    it('should match snapshot', () => {
        const params = {
            sortedColleges: [
                {
                    name: 'CollegeA',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 10,
                },
                {
                    name: 'CollegeB',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Tigers',
                    count: 8,
                },
                {
                    name: 'CollegeC',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Bears',
                    count: 6,
                },
                {
                    name: 'CollegeD',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Oh My',
                    count: 4,
                },
                {
                    name: 'CollegeE',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 2,
                }
            ]
        };
    
        const TestResults = render(
            <NavigationContainer>
                <Results route={{ params }} />
            </NavigationContainer>
        ).toJSON();
    
        expect(TestResults).toMatchSnapshot();
    });
    
    it('navigates to Home screen', () => {
        const navigate = jest.fn();
    
        const params = {
            sortedColleges: [
                {
                    name: 'CollegeA',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 10,
                },
                {
                    name: 'CollegeB',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Tigers',
                    count: 8,
                },
                {
                    name: 'CollegeC',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Bears',
                    count: 6,
                },
                {
                    name: 'CollegeD',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Oh My',
                    count: 4,
                },
                {
                    name: 'CollegeE',
                    image: 'https://i0.wp.com/athertoncpas.com/wp-content/uploads/2016/09/generic-uni-logo-1.png',
                    mascot: 'Lions',
                    count: 2,
                }
            ]
        };
    
        const { getByText } = render(
            <NavigationContainer>
                <Results
                    navigation={{ navigate }}
                    route={{ params }}
                />
            </NavigationContainer>
        );
        fireEvent.press(getByText('Home >>'));
        expect(navigate).toHaveBeenCalledWith('Home');
    });

})
