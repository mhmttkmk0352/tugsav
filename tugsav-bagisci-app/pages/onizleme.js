import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

class App extends React.Component{
    constructor(props){
        super( props );
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1, resizeMode:"cover", justifyContent:"center"}} source={{ uri:this.props.route.params.data.uri }}></ImageBackground>
            </View>
        );
    }
}

export default App;