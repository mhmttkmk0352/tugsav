import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';

class App extends React.Component{
    constructor(props){
        super( props );
        this.state = {ad:"", il:"", ilçe:"", adres:""}
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
                        <Input style={styles.Input} value={this.state.ad} placeholder="Adınız Ve Soyadınız" onChangeText={ text => { this.setState({ad: text}) } } />
                        </Item>
                        <Item>
                        <Input style={styles.Input} value={this.state.il} placeholder="Parola" onChangeText={text => { this.setState({il:text}) }}/>
                        </Item>
                        <Button primary onPress={ ()=>{this.kayd()} } style={styles.Button}>
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