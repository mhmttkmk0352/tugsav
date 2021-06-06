import React from 'react';
import {SafeAreaView, View, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
var Buffer = require('buffer/').Buffer


class App extends React.Component{
    constructor(props){
        super( props );
        this.state={
            url:"https://ozveriimalat.com/services/users-service.php?",
            latitude: "",
            longitude: ""
        }
    }
    goToPage = (pageName, data) => {
        const stackAction = StackActions.push( pageName, data );
        this.props.navigation.dispatch( stackAction );
    }
    gonder = () => {
        const data = new FormData();
        data.append("file", {uri:this.props.route.params.data.uri, name:"res.jpg", type:"image/jpg"});
        data.append("ad", this.props.route.params.ad);
        data.append("telefon", this.props.route.params.telefon);
        data.append("adres", this.props.route.params.adres);
        data.append("latitude", this.state.latitude);
        data.append("longitude", this.state.longitude);
        

        /*
        const postFields = 'ad='+this.props.route.params.ad+
        '&telefon='+this.props.route.params.adres+
        '&adres='+this.props.route.params.adres+
        '&data='+this.props.route.params.data.base64;

        */
     
console.log( {once:data} );
        axios.post(this.state.url+"komut=kaydet", data).then(r=>{
            console.log( r.data );
            Alert.alert(r.data.title, r.data.message);
            this.goToPage("Kayit", {});
        }).catch(err=>{
            console.log( err );
            Alert.alert("Uyarı !", "Lütfen internet bağlantınızın açık olduğundan emin olduktan sonra yeniden deneyiniz !");
        })
    }

    getPosXY = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          }).then( data => {
            if ( data  ){
                Geolocation.getCurrentPosition( position => {
                   console.log( {coords:position.coords} );
                   this.setState( {latitude:position.coords.latitude} );
                   this.setState( {longitude:position.coords.longitude} );
                   
                  });
            }
            else{
              this.getPosXY();
            }
          }).catch(err=>{
            this.getPosXY();
          });
    }

    componentDidMount(){
        //console.log( this.props.route.params );
        this.getPosXY();
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:90}}>
                    <ImageBackground style={{flex:1, resizeMode:"cover", justifyContent:"center"}} source={{ uri:this.props.route.params.data.uri }}></ImageBackground>
                </View>
                <View style={{flex:10}}>
                <SafeAreaView style={{flex:10, marginBottom:5, backgroundColor:"#008CBA", justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity onPress={() => {this.gonder()} }>
                        <Text style={{color:"white", fontSize:20, fontWeight:"bold", borderRadius:30}}>
                            GÖNDER
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
                </View>
            </SafeAreaView>
        );
    }
}

export default App;