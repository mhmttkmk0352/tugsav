import React from 'react';
import { SafeAreaView, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends React.Component{
  constructor( props ){
    super(props );
    this.state = {
      url:"https://lamerdiary.com/services/service.php?",
      hash:this.props.route.params.hash,
      barcode: "",
      islem:this.props.route.params.islem,
      positions:this.props.route.params.positions
    }

  }

  componentDidMount(){
    AsyncStorage.getItem("hash").then(hash=>{
      this.setState({"hash": hash});
    });
  }

  goToPage=(pageName, data)=>{
      const stackAction = StackActions.push( pageName, data );
      this.props.navigation.dispatch( stackAction );
  }
  onBarCodeRead=(e)=>{
      //this.setState( {barcode: e.data} );
      this.state["barcode"] = e.data;

      if ( this.state.islem == "ekle" ){
        this.goToPage("Forum", this.state);
      }
      else if ( this.state.islem == "kaldir" ){
        let url = this.state.url + "komut=guncelle&barcode=" + e.data;
        console.log( {url} );
        axios.get( url ).then( res => {
          console.log( {res} );
          if ( res.data.status == 1 ){
            alert( res.data.message );
            this.goToPage("Anasayfa", {});
          }
        });
      }
      else if ( this.state.islem == "onar" ){
        this.goToPage("Forum", this.state);
      }
        
  }
    
  render(){
        return(
            <RNCamera
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
                onBarCodeRead={this.onBarCodeRead}
          />
        );
    }
}

export default App;