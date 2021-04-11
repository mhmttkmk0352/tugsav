import React from 'react';
import {SafeAreaView, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
class App extends React.Component{
    constructor(props){
        super( props );
        this.state={resim_uri:this.props.route.params.data.uri}
    }
    goToPage = (pageName, data) => {
        const stackAction = StackActions.push( pageName, data );
        this.props.navigation.dispatch( stackAction );
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:90}}>
                    <ImageBackground style={{flex:1, resizeMode:"cover", justifyContent:"center"}} source={{ uri:this.props.route.params.data.uri }}></ImageBackground>
                </View>
                <View style={{flex:10}}>
                <SafeAreaView style={{flex:10, marginBottom:5, backgroundColor:"#008CBA", justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity onPress={ () => {this.goToPage( "Kayit", {resim_uri:this.state.resim_uri} ) }}>
                        <Text style={{color:"white", fontSize:20, fontWeight:"bold", borderRadius:30}}>
                            DEVAM
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
                </View>
            </SafeAreaView>
        );
    }
}

export default App;