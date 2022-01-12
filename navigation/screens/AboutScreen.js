import * as React from 'react';
import {View, Text, ScrollView} from 'react-native'
import Autolink from 'react-native-autolink';
import Icon from "react-native-vector-icons/FontAwesome";

export default function AboutScreen({navigation}) {

    const Mail = () => (
        <Autolink
            // Required: the text to parse for links
            text="Damianbloemhof@gmail.com"
            // Optional: enable email linking
            email
        />
    );

    return (
        <ScrollView style={{flex: 1, marginTop: 30}}>

            <Text style={{
                fontSize: 26,
                fontWeight: 'bold',
                backgroundColor: "#581845",
                padding: 10,
                color: '#FFC300'
            }}><Icon name="info-circle" size={26} color="#FFC300"/> About</Text>

            <View style={{paddingHorizontal: 15, fontSize: 26, fontWeight: 'bold'}}>

                <View style={{ paddingBottom: 20, justifyContent: 'center'}}>

                    <Text style={{fontSize: 26, fontWeight: 'bold'}}>Info</Text>

                    <Text style={{fontSize: 15,}}>This app will show u some data about current and upcoming vacations
                        in the Netherlands. Made by Damian Bloemhof</Text>

                </View>

                <View style={{justifyContent: 'center'}}>

                    <Text style={{fontSize: 26, fontWeight: 'bold'}}>Faq</Text>

                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>When i change region it doesnt appear in the list</Text>
                    <Text style={{fontSize: 15, paddingBottom: 10}}> - Try refreshing the screen by swiping down</Text>

                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>If i want to rate this app how do i do that?</Text>
                    <Text style={{fontSize: 15,}}> - Send an email to <Mail></Mail> and be sure to give me a good rating!</Text>


                </View>
            </View>
        </ScrollView>

    );
}
