import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//Page Start
import Giris from './pages/giris';
import Anasayfa from './pages/anasayfa';
import Barcode from './pages/barcode';
import Forum from './pages/forum';
import Kamera from './pages/kamera';
import Onizleme from './pages/onizleme';
import Kayit from './pages/kayit';
//Page End

class App extends React.Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Kamera"}>
          <Stack.Screen name="Giris" component={Giris} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Anasayfa" component={Anasayfa} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Barcode" component={Barcode} options={{headerShown:true}}></Stack.Screen>
          <Stack.Screen name="Forum" component={Forum} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Kamera" component={Kamera} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Onizleme" component={Onizleme} options={{headerShown:true}}></Stack.Screen>
          <Stack.Screen name="Kayit" component={Kayit} options={{headerShown:true}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;