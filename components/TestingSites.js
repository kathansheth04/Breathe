import React, { Component } from 'react';
import { FlatList, Image, Linking, StyleSheet, ActivityIndicator, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Body, Right, Left, Icon } from 'native-base'
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name1: "",
            name2: "",
            name3: "",
            name4: "",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            phone1: "",
            phone2: "",
            phone3: "",
            phone4: ""
        }
    }
    componentDidMount() {
        return fetch('https://covid-19-testing.github.io/locations/california/complete.json')
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.results,
                    },
                    function () {
                        this.arrayholder = responseJson.results
                    }
                );
                this.setState({
                    name1: responseJson[0].name,
                    name2: responseJson[1].name,
                    name3: responseJson[2].name,
                    name4: responseJson[3].name,
                    address1: responseJson[0].physical_address[0].address_1,
                    address2: responseJson[1].physical_address[0].address_1,
                    address3: responseJson[2].physical_address[0].address_1,
                    address4: responseJson[3].physical_address[0].address_1,
                    phone1: responseJson[0].phones[0].number,
                    phone2: responseJson[1].phones[0].number,
                    phone3: responseJson[2].phones[0].number,
                    phone4: responseJson[3].phones[0].number,

                })
            })
            .catch(error => {
                console.error(error);
            });

    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, margin: 20 }}>
                    <View style={styles.cards}>
                        <Text>
                            {this.state.name1}
                        </Text>
                        <View style={{height: 45, width: 200, flexDirection: 'row'}}>
                        <Ionicons onPress={() => Linking.openURL(`https://www.google.com/maps/place/${this.state.address1}`)}
                        style={{marginRight: 50}} name="ios-navigate" size={45}/>
                        <Ionicons onPress={() => {
                            Linking.openURL(`tel:${this.state.phone1}`)
                        }}
                        style={{marginLeft: 60, }}name="ios-call" size={45}/>
                        </View>
                        
                    </View>
                    <View style={styles.cards}>
                        <Text>{this.state.name2}</Text>
                        <View style={{height: 45, width: 200, flexDirection: 'row'}}>
                        <Ionicons onPress={() => Linking.openURL(`https://www.google.com/maps/place/${this.state.address2}`)}
                        style={{marginRight: 50}} name="ios-navigate" size={45}/>
                        <Ionicons onPress={() => {
                            Linking.openURL(`tel:${this.state.phone1}`)
                        }}
                        style={{marginLeft: 60, }}name="ios-call" size={45}/>
                        </View>
                    </View>
                    <View style={styles.cards}>
                        <Text>{this.state.name3}</Text>
                        <View style={{height: 45, width: 200, flexDirection: 'row'}}>
                        <Ionicons onPress={() => Linking.openURL(`https://www.google.com/maps/place/${this.state.address3}`)}
                        style={{marginRight: 50}} name="ios-navigate" size={45}/>
                        <Ionicons onPress={() => {
                            Linking.openURL(`tel:${this.state.phone1}`)
                        }}
                        style={{marginLeft: 60, }}name="ios-call" size={45}/>
                        </View>
                    </View>
                    <View style={styles.cards}>
                        <Text>{this.state.name4}</Text>
                        <View style={{height: 45, width: 200, flexDirection: 'row'}}>
                        <Ionicons onPress={() => Linking.openURL(`https://www.google.com/maps/place/${this.state.address4}`)}
                        style={{marginRight: 50}} name="ios-navigate" size={45}/>
                        <Ionicons onPress={() => {
                            Linking.openURL(`tel:${this.state.phone1}`)
                        }}
                        style={{marginLeft: 60, }}name="ios-call" size={45}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,

    },
    cards: {
        margin: 20,
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 3,
        height: height * 0.2,
        width: width * 0.75,
        backgroundColor: "#E55B46",
        opacity: 0.8,
        shadowOffset: { wdith: 3, height: 1 },
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        alignItems: "center",
        justifyContent: "center",
    }
});
