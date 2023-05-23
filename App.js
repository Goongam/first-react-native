import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image  } from 'react-native';
import TestComponent from './components/TestComponent';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import List from './components/List'
import { QueryClientProvider, QueryClient } from 'react-query';

import Main from './screen/Main';
import Login from './components/Login';
import QRCodeScanner from './components/QRCodeScanner';

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from 'react';


import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { getData } from './service/storage';
import QRCodeGenerator from './components/QRCodeGenerater';
import { qrLogin, qrLogout } from './service/auth';

const queryClient = new QueryClient();
export default function App() {

  const Stack = createStackNavigator();

  const [QRModalVisible, setQRModalVisible] = useState(false);
  const [token, setToken] = useState(undefined);
 
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Main} 
          options={{
            headerRight:()=>{
              return(
                <View className="flex flex-row items-center">
                  <AntDesign onPress={()=>qrLogin(setQRModalVisible, setToken)} name="qrcode" size={40} color="black" />
                  <MaterialIcons onPress={()=>qrLogout(setToken)} name="logout" size={40} color="black" />
                  <Modal visible={QRModalVisible} animationType="slide" transparent={true}>
                    <QRCodeGenerator setModalVisible={setQRModalVisible} token={token}/>
                  </Modal>
                </View>
              )
              
            }
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {/* <Text>환율 API</Text> */}
        {/* <TestComponent /> */}
        {/* <List /> */}
        <Login />
        {/* <QRCodeScanner /> */}
        <StatusBar style="auto" />
        <Toast />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color:'#ffffff'
  },
});
