import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';

class App extends React.Component{
    constructor(props){
        super( props );
        this.state = {ad:"", il:"İstanbul", ilçe:"", adres:"",  resimbase64:this.props.route.params.onizleme_params.data.base64}
    }
    kayit = () => {
        console.log( this.state );
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
                            <Input style={styles.Input} value={this.state.ad} placeholder="Adınız" onChangeText={ text => { this.setState({ad: text}) } } />
                        </Item>
                        <Item>
                            <Input style={styles.Input} value={this.state.il} placeholder="İliniz" onChangeText={text => { this.setState({il:text}) }}/>
                        </Item>
                        <Item>
                            <Input style={styles.Input} value={this.state.ilce} placeholder="İlçeniz" onChangeText={text => { this.setState({ilce:text}) }}/>
                        </Item>
                        <Item>
                            <Input style={styles.Input} value={this.state.adres} placeholder="Adresiniz" onChangeText={text => { this.setState({adres:text}) }}/>
                        </Item>
                        
                        <Button primary onPress={ ()=>{this.kayit()} } style={styles.Button}>
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