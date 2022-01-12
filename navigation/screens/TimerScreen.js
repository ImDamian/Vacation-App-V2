import {Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import axios from "axios";
import CountDown from "react-native-countdown-component";
import Icon from "react-native-vector-icons/FontAwesome";


export default function CounterTab() {
    const [HolidayData, setHolidayData] = useState([]);
    const [Available, SetAvailable] = useState(false);

    function getHolidayData() {
        axios
            .get(
                "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
            )
            .then((res) => {
                const data = {};
                let dataSet = false;
                res.data.content[0].vacations.forEach((element) => {
                    let ans = calculateDays(element.regions[0].startdate);
                    if (dataSet) {
                        return;
                    }
                    if (ans <= 0) {
                        return;
                    }
                    data.type = element.type;
                    data.regions = element.regions;
                    data.daysToGo = ans;
                    dataSet = true;
                });
                // console.log(data);
                setHolidayData(data);
                SetAvailable(true);
            });
    }

    useEffect(() => {
        getHolidayData();
    }, []);

    function calculateDays(date) {
        const date1 = new Date();
        const date2 = new Date(date);
        return Math.floor((date2 - date1) / 1000);
    }

    return (
        <View style={{flex: 1, marginTop: 30}}>
            <Text style={{fontSize: 26, fontWeight: 'bold', backgroundColor: "#581845", padding: 10, color: '#FFC300'}}><Icon
                name="clock-o" size={26} color="#FFC300"/> Timer</Text>

            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center',
                alignContent: 'center',
                fontSize: 26,
                fontWeight: 'bold'
            }}>

                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'black'}}>Eerst volgende
                        vakantie:</Text>
                </View>

                {Available ? (
                    <CountDown
                        size={30}
                        until={HolidayData.daysToGo - 60 * 60 * 24}
                        onFinish={() => alert('HET IS VAKANTIEE HEUUUUUUJJJJJ')}
                        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#C70039'}}
                        digitTxtStyle={{color: '#FFC300'}}
                        timeLabelStyle={{color: '#C70039', fontWeight: 'bold'}}
                        separatorStyle={{color: '#581845'}}
                        timeToShow={['D', 'H', 'M', 'S']}
                        showSeparator
                    />
                ) : (
                    <Text>No data available</Text>
                )}
            </View>
        </View>
    );
}
