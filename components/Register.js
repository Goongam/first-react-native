import { TextInput, Text, StyleSheet, Button, View } from "react-native";
import useInput from "../hooks/useInput";
import Config from 'react-native-config';

function register(name, id, pass){
    fetch(`${Config.APIURL}/member/new`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      password: pass,
      name: name,
    }),
  });
}

async function testFetch(){
    const res = await fetch(`${Config.APIURL}/members`);
    const data = await res.json();
    console.log(data);
  
}

export default function Register(){

    const [name, setName] = useInput('');
    const [id, setId] = useInput('');
    const [password, setPassword] = useInput('');

    return (
    <>
        <Text>회원가입1</Text>
        {/* onChangeText={setText} value={text} */}
        <View>
            <TextInput placeholder="name" style={styles.input} onChangeText={setName} value={name}/>
            <TextInput placeholder="id" style={styles.input} onChangeText={setId} value={id}/>
            <TextInput placeholder="password" style={styles.input} onChangeText={setPassword} value={password}/>
        </View>
        <Button title="가입" onPress={() => register(name,id,password)} /> 
        <Button title="테스트" onPress={()=> testFetch()} />
    </>);
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1, // 경계선 두께
        borderColor: '#ccc', // 경계선 색상
        borderRadius: 5, // 경계선 라운드 처리
        paddingHorizontal: 10, // 가로 여백
        paddingVertical: 5, // 세로 여백
        width: 300,
    }
});