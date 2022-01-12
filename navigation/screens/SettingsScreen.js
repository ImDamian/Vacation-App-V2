import React, {useState, useEffect} from "react";
import {Text, View, ScrollView} from "react-native";
import {Picker} from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import CountDown from "react-native-countdown-component";

export default function SettingsScreen() {
    const [Region, setRegion] = useState(getRegion);
    const setNewRegion = async (region) => {
        setRegion(region);
        try {
            await AsyncStorage.setItem("Region", region);
        } catch (e) {
            // console.log(e);
        }
        console.log(region);
    };
    const getRegion = async () => {
        try {
            region = await AsyncStorage.getItem("Region");
        } catch (e) {
            console.log(e);

        }
        setRegion(region);

    };
    getRegion();

    return (
        <ScrollView style={{flex: 1, marginTop: 30}}>

            <Text style={{fontSize: 26, fontWeight: 'bold', backgroundColor: "#581845", padding: 10, color: '#FFC300'}}><Icon
                name="gear" size={26} color="#FFC300"/> Settings</Text>

            <View style={{
                paddingTop: 50,
                justifyContent: "center",
                alignItems: 'center',
                alignContent: 'center',
                fontSize: 26,
                fontWeight: 'bold'
            }}>

                <View style={{justifyContent: "center", alignItems: "center"}}>

                    <View>
                        <Text style={{justifyContent: "center", alignItems: "center", fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'black'}}>Selecteer de regio waarvan u vakantie data wilt zien.</Text>
                    </View>

                    <View
                        style={{
                            borderWidth: 2,
                            borderColor: "#C70039",
                            borderRadius: 6,
                            width: 275,

                        }}
                    >
                        <Picker
                            selectedValue={Region}
                            onValueChange={(itemValue, itemIndex) => setNewRegion(itemValue)}
                        >
                            <Picker.Item label="noord" value="noord"/>
                            <Picker.Item label="midden" value="midden"/>
                            <Picker.Item label="zuid" value="zuid"/>
                        </Picker>
                    </View>

                    <View>
                        <Text style={{fontSize: 9, fontWeight: 'bold', color: 'black'}}>Refresh het home menu om de verandering te kunnen zien</Text>
                    </View>

                </View>
            </View>
        </ScrollView>

    );
}
