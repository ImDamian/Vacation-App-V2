import {Text, ScrollView, View, RefreshControl, ImageBackground, StyleSheet, Image} from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {ListItem} from "react-native-elements";
import {Picker} from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CalenderTab() {
    const [HolidayData, setHolidayData] = useState([]);
    const [Available, SetAvailable] = useState(false);
    const [SchoolYear, SetSchoolYear] = useState("2021-2022");
    const [Region, setRegion] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const imageHerfst = {uri: "https://welkeregio.nl/wp-content/uploads/2020/07/nature-red-forest-leaves-33109.jpg"};
    const imageKerst = {uri: "https://i1.wp.com/www.beterjudo.nl/wp-content/uploads/2021/11/kerst.png?resize=768%2C468&ssl=1"};
    const imageVoorjaar = {uri: "https://www.schoolvakantieseuropa.be/wp-content/uploads/2018/10/holland.jpg"};
    const imageMei = {uri: "https://holtkamp-goes.nl/wp-content/uploads/meivakantie.jpg"};
    const imageZomer = {uri: "https://lvoscholen.blob.core.windows.net/cache/5/c/4/f/1/b/5c4f1b26a7544e72f3867f02346eeaae8a5f3cfa.jpg"};


    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            padding: 20,
            flex: 1,
            justifyContent: "center"
        },
        text: {
            color: "white",
            fontSize: 42,
            lineHeight: 84,
            fontWeight: "bold",
            textAlign: "center",
        }
    });


    function getHolidayData() {
        axios
            .get(
                "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/" +
                SchoolYear +
                "?output=json"
            )
            .then((res) => {
                const data = res.data.content[0];
                setHolidayData(data);
                SetAvailable(true);
            });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getRegion()
        getHolidayData()
        setRefreshing(false);
    }, []);

    const getRegion = async () => {
        try {
            region = await AsyncStorage.getItem("Region");
        } catch (e) {
            // console.log(e);
        }
        setRegion(region);
    };


    useEffect(() => {
        getHolidayData();
        getRegion();
    }, [SchoolYear]);

    return (
        <ScrollView style={{marginTop: 30}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
        >
            <View>

                <Text style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    backgroundColor: "#581845",
                    padding: 10,
                    color: '#FFC300'
                }}>

                    <Icon name="home" size={26} color="#FFC300"/> Home</Text>
                <View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center',
                        alignContent: 'center',
                    }}>
                        {Available ? (
                            <Text style={{
                                fontWeight: 'bold',
                                padding: 10,
                            }}
                            >
                                {HolidayData.title.replace("\n", "").trim()}</Text>) : (
                            <Text>Title was not found</Text>
                        )}
                    </View>
                </View>


                <Picker
                    style={{backgroundColor: "white"}}
                    selectedValue={SchoolYear}
                    onValueChange={(itemValue, itemIndex) => SetSchoolYear(itemValue)}
                >
                    <Picker.Item label="2021-2022" value="2021-2022"/>
                    <Picker.Item label="2022-2023" value="2022-2023"/>
                    <Picker.Item label="2023-2024" value="2023-2024"/>
                </Picker>

                {Available ? (
                    HolidayData.vacations.map((d, i) => (
                        <ListItem key={i} topDivider style={{paddingVertical: 5}}>

                            {/*{console.log(d.type)}*/}

                            <ListItem.Content style={styles.text}>
                                <ListItem.Title>{d.type.replace("\n", "").trim()}</ListItem.Title>

                                {d.regions.map((sd, i) =>
                                    sd.region == Region ? (
                                        <ListItem.Subtitle key={i} style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                            {sd.region}: {sd.startdate.slice(0, 10)} -{" "}
                                            {sd.enddate.slice(0, 10)}
                                        </ListItem.Subtitle>
                                    ) : null || sd.region == "heel Nederland" ? (
                                        <ListItem.Subtitle key={i}  style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                            {sd.region}: {sd.startdate.slice(0, 10)} -{" "}
                                            {sd.enddate.slice(0, 10)}
                                        </ListItem.Subtitle>
                                    ) : null
                                )}

                                {d.type.replace("\n", "").trim() == "Herfstvakantie" ? (

                                    <Image source={imageHerfst} style={{width: 305, height: 159}}/>

                                ) : null || d.type.replace("\n", "").trim() == "Kerstvakantie" ? (

                                    <Image source={imageKerst} style={{width: 305, height: 159}}/>

                                ) : null || d.type.replace("\n", "").trim() == "Voorjaarsvakantie" ? (

                                    <Image source={imageVoorjaar} style={{width: 305, height: 159}}/>

                                ) : null || d.type.replace("\n", "").trim() == "Meivakantie" ? (

                                    <Image source={imageMei} style={{width: 305, height: 159}}/>

                                ) : null || d.type.replace("\n", "").trim() == "Zomervakantie" ? (

                                    <Image source={imageZomer} style={{width: 305, height: 159}}/>

                                ) : null
                                }

                            </ListItem.Content>
                        </ListItem>
                    ))
                ) : (
                    <Text>No data available</Text>
                )}

            </View>

        </ScrollView>
    );
}
