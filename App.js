import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View  } from 'react-native';
import TestComponent from './components/TestComponent';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import List from './components/List'
import { QueryClientProvider, QueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from './service/storage';
import Login from './components/Login';
import QRCodeScanner from './components/QRCodeScanner';


const queryClient = new QueryClient();
export default function App() {

  // storeData('test',{'a':1});
 
  // getData('test').then(data=>console.log(data));




  return (
    <QueryClientProvider client={queryClient}>
    <View style={styles.container}>
      {/* <Text>환율 API</Text> */}
      {/* <TestComponent /> */}
      {/* <List /> */}
      {/* <Login /> */}
      <QRCodeScanner />
      <StatusBar style="dark" />
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
