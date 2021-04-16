import React from 'react';
import {SafeAreaView, View, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';
import axios from 'axios';
var Buffer = require('buffer/').Buffer


class App extends React.Component{
    constructor(props){
        super( props );
        this.state={
            url:"https://lamerdiary.com/services/users-service.php?"
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


        /*
        const postFields = 'ad='+this.props.route.params.ad+
        '&telefon='+this.props.route.params.adres+
        '&adres='+this.props.route.params.adres+
        '&data='+this.props.route.params.data.base64;

        */
     

        axios.post(this.state.url+"komut=kaydet", data).then(r=>{
            console.log( r.data );
            Alert.alert(r.data.title, r.data.message);
            this.goToPage("Kayit", {});
        }).catch(err=>{
            console.log( err );
            Alert.alert("Uyarı !", "Lütfen internet bağlantınızın açık olduğundan emin olduktan sonra yeniden deneyiniz !");
        })
    }

    componentDidMount(){
        //console.log( this.props.route.params );
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