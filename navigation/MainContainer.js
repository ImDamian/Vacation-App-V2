import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import TimerScreen from './screens/TimerScreen';
import AboutScreen from './screens/AboutScreen';
import SettingsScreen from './screens/SettingsScreen';

//Screen names
const homeName = "Home";
const timerName = "Timer";
const aboutName = "About";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === timerName) {
                            iconName = focused ? 'time' : 'time-outline';

                        } else if (rn === aboutName) {
                            iconName = focused ? 'information-circle' : 'information-circle-outline';

                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#FFC300',
                    inactiveTintColor: '#C70039',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70, backgroundColor: '#581845'}
                }}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={timerName} component={TimerScreen}/>
                <Tab.Screen name={aboutName} component={AboutScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
