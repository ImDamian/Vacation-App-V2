import MainContainer from './navigation/MainContainer';
import React, {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const init = async () => {
    // const value = await AsyncStorage.removeItem("Region");
    try {
        const value = await AsyncStorage.getItem("Region");
        if (value !== null) {
        } else {
            setRegion();
        }
    } catch (e) {
        console.log(e);
    }
};

const setRegion = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("permission not granted");
    }

    const userLocation = await Location.getCurrentPositionAsync();
    console.log(userLocation);
    let region = "";
    if (userLocation.coords.latitude >= 53) {
        region = "noord";
    }
    if (userLocation.coords.latitude < 53) {
        region = "midden";
    }
    if (userLocation.coords.latitude <= 52) {
        region = "zuid";
    }
    try {
        await AsyncStorage.setItem("Region", region);
    } catch (e) {
        console.log(e);
    }
};

function App() {

    // function setOrientation() {
    //     if (Dimensions.get('window').height > Dimensions.get('window').width) {
    //         //Device is in portrait mode, rotate to landscape mode.
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    //     }
    //     else {
    //         //Device is in landscape mode, rotate to portrait mode.
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    //     }
    // }

    init();
    return (
        <MainContainer/>
    );
}

export default App;
