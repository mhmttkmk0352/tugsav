import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Image, Alert } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import { StackActions } from '@react-navigation/native';
//import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
//import Geolocation from 'react-native-geolocation-service';


class App extends React.Component{
    constructor(props){
        super( props );
        this.state = {ad:"", telefon:"", adres:""}
    }

    goToPage = (pageName, data) => {
        const stackAction = StackActions.push( pageName, data );
        this.props.navigation.dispatch( stackAction );
    }

    kaydet=()=>{
        console.log( this.state );
        if ( this.state.ad != "" && this.state.telefon != "" && this.state.adres !=""  ){
            this.goToPage( "Kamera", this.state );
        }
        else{
            Alert.alert( "Uyarı!", "Lütfen tüm alanları doldurunuz." );
        }
    }
    
    componentDidMount(){
        
    }

    render(){
        return(
            <SafeAreaView style={styles.SafeAreaView}>
                <View style={{flex:50 ,justifyContent:"center", alignItems:"center"}}>
                    <Image source={require("./images/logo.png")} style={styles.Image} />
                </View>
                <View style={{flex:50}}>
                    <Form>
                        <Item>
                            <Input style={styles.Input} value={this.state.ad} placeholder="Ad ve soyad" onChangeText={ text => { this.setState({ad: text}) } } />
                        </Item>
                        <Item>
                            <Input style={styles.Input} value={this.state.telefon} placeholder="Telefon" onChangeText={text => { this.setState({telefon:text}) }}/>
                        </Item>
                        <Item>
                            <Input style={styles.Input} value={this.state.adres} placeholder="Adres" onChangeText={text => { this.setState({adres:text}) }}/>
                        </Item> 
                        <Button primary onPress={ ()=>{this.kaydet()} } style={styles.Button}>
                        <Text>Gönder</Text>
                        </Button>
                    </Form>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    SafeAreaView:{flex:1,flexDirection:"column", backgroundColor:"#f1f1f1"},
    Button:{width:'100%',justifyContent:'center'},
    Input:{textAlign:"center"},
    Image:{width:"50%", height:"50%"}
  });

export default App;