import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { StackActions } from '@react-navigation/native';
//import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
//import Geolocation from 'react-native-geolocation-service';

class App extends React.Component {
    constructor( props ){
        super( props );
        this.state = {}
    }

    goToPage = (pageName, data) => {
        const stackAction = StackActions.push( pageName, data );
        this.props.navigation.dispatch( stackAction );
    }

    takePicture = async() => {
        if ( this.camera ){
            this.props.route.params["data"] = await this.camera.takePictureAsync({quality:0.5, base64:true})
            this.goToPage( "Onizleme", this.props.route.params );
        }
    }
/*
    openGps = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        }).then( data => {
          if ( data  ){
            Geolocation.getCurrentPosition(position => {
                console.log( {pos:position, data:data} );
            });
          }
          else{
            this.openGps();
          }
        }).catch(err=>{
          this.openGps();
        });
    }
*/  
    componentDidMount(){
        //console.log( {kamera_props:this.props.route.params} );
        //this.openGps();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <SafeAreaView style={{flex:90, justifyContent:"center"}}>
                    <RNCamera
                        ref={ref => {  
                            this.camera = ref;
                        }}
                        style={{flex:1}}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Kamera izni gerekiyor',
                            message: 'Kamera ile manzara fotoğrafı çekmek için izin vermeniz gerekiyor.',
                            buttonPositive: 'Tamam',
                            buttonNegative: 'İptal'
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Mikrofon izni gerekiyor',
                            message: 'Mikrofon ile ses kaydı yapmak için için izin vermeniz gerekiyor.',
                            buttonPositive: 'Tamam',
                            buttonNegative: 'İptal'
                        }}
                    />
                </SafeAreaView>
                <SafeAreaView style={{flex:10, marginBottom:5, backgroundColor:"#008CBA", justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity onPress={ this.takePicture.bind(this) }>
                        <Text style={{color:"white", fontSize:20, fontWeight:"bold", borderRadius:30}}>
                            RESMİNİ ÇEK
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
            
        );
    }
}

export default App;