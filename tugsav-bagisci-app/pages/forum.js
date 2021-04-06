import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';


class App extends Component {
  constructor( props ){
    super( props );
    this.state = {
      url:"https://lamerdiary.com/services/service.php?",
      baslik:"",
      aciklama:"",
      hash:this.props.route.params.hash,
      barcode:this.props.route.params.barcode,
      islem:this.props.route.params.islem,
      positions:this.props.route.params.positions
    }
    console.log({ forumJS:this.state });
  }

  goToPage=(pageName, data)=>{
    const stackAction = StackActions.push(pageName, data);
    this.props.navigation.dispatch( stackAction );
  }

  saveStorage=async( hash )=>{
    /*
    let pr = new Promise((resolve, reject)=>{
      (async()=>{
        AsyncStorage.setItem("hash", hash).then();
        AsyncStorage.setItem("kullanici_adi", this.state.kullanici_adi).then();
        AsyncStorage.setItem("parola", this.state.parola).then();
        resolve(1);
      })()
    });
    return pr
    */
  }

  kaydet = async() => {
    pr = new Promise((resolve, reject) => {
      (async()=>{
        let url = this.state.url+"komut=ekle&hash="+this.state.hash+"&latitude="+this.state.positions.latitude+"&longitude="+this.state.positions.longitude+"&baslik="+this.state.baslik+"&aciklama="+this.state.aciklama+"&barcode="+this.state.barcode;
        console.log( {url} );
        axios.get( url ).then( res => {
            resolve( res.data );
        });
      })()
    });
    return pr;
  }

  onar = async() => {
    pr = new Promise((resolve, reject) => {
      (async()=>{
        let url = this.state.url+"komut=onar&hash="+this.state.hash+"&latitude="+this.state.positions.latitude+"&longitude="+this.state.positions.longitude+"&baslik="+this.state.baslik+"&aciklama="+this.state.aciklama+"&barcode="+this.state.barcode;
        console.log( {url} );
        axios.get( url ).then( res => {
            resolve( res.data );
        });
      })()
    });
    return pr;
  }


  componentDidMount(){
    AsyncStorage.getItem("hash").then(hash=>{
      this.setState({"hash": hash});
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
          <View style={{flex:50, justifyContent:"center"}}>
              <Form>
                <Item>
                  <Input style={styles.Input} value={this.state.baslik} placeholder="Başlık" onChangeText={ text => { this.setState({baslik: text}) } } />
                </Item>
                <Item>
                  <Input style={{textAlign:"center"}} value={this.state.aciklama} placeholder="Açıklama" onChangeText={text => { this.setState({aciklama:text}) }}/>
                </Item>
                <Button primary onPress={ ()=>{this.kaydet().then(data=>{
                  console.log( {myState:this.state} );
                  if ( data.status ==1 ){
                    this.goToPage("Anasayfa", {});
                  }
                  else{
                    this.goToPage("Anasayfa", {});
                    alert( data.message );
                  }
                })} } style={styles.Button}>
                  <Text>Kaydet</Text>
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
  Image:{width:"60%", height:"60%"}
});

export default  App;