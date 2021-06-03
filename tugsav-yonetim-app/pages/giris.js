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
      url:"https://ozveriimalat.com/services/service.php?",
      kullanici_adi:"",
      parola:"",
      hash:""
    }
  }

  goToPage=(pageName, data)=>{
    const stackAction = StackActions.push(pageName, data);
    this.props.navigation.dispatch( stackAction );
  }

  saveStorage = ( hash ) => {
    AsyncStorage.setItem("hash", hash).then();
    //AsyncStorage.setItem("kullanici_adi", this.state.kullanici_adi).then();
    //AsyncStorage.setItem("parola", this.state.parola).then();
  }

  girisYap=()=>{
    if ( this.state.kullanici_adi && this.state.kullanici_adi.length > 0 && this.state.parola && this.state.parola.length > 0 ){
      axios.get(this.state.url+"komut=hash&kullanici_adi="+this.state.kullanici_adi+"&parola="+this.state.parola).then(res=>{ 
        if ( res && res.data && res.data.status == 1 && res.data.hash ){
          hash = res.data.hash;
          this.setState( {hash: hash} );
          this.saveStorage( hash );
          this.goToPage("Anasayfa", {hash:hash});
        }
        else{
          this.saveStorage( hash );
          alert("Kullanıcı adı ya da parolanız yanlış !");
        }
      })
    }
    else{
      alert("Kullanıcı ya da parola bilgilerini girmediniz !");
    }
  }

  componentDidMount(){
    /*
    AsyncStorage.getItem("kullanici_adi").then(kullanici_adi=>{
      this.setState( {kullanici_adi:kullanici_adi} );
    });
    AsyncStorage.getItem("parola").then(parola=>{
      this.setState( {parola:parola} );
    });
    */

  }

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
          <View style={{flex:50 ,justifyContent:"center", alignItems:"center"}}>
            <Image source={require("./images/logo.png")} style={styles.Image} />
          </View>
          <View style={{flex:50}}>
              <Form>
                <Item>
                  <Input style={styles.Input} value={this.state.kullanici_adi} placeholder="Kullanıcı Adı" onChangeText={ text => { this.setState({kullanici_adi: text}) } } />
                </Item>
                <Item>
                  <Input style={styles.Input} secureTextEntry={true} value={this.state.parola} placeholder="Parola" onChangeText={text => { this.setState({parola:text}) }}/>
                </Item>
                <Button primary onPress={ ()=>{this.girisYap()} } style={styles.Button}>
                  <Text>Giriş Yap</Text>
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

export default  App;