import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View  } from 'react-native';
import TestComponent from './components/TestComponent';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>환율 API</Text> */}
      <TestComponent />
      <StatusBar style="dark" />
    </View>
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
