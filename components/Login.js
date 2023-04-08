import { useState } from "react";
import { Button, TextInput, StyleSheet } from "react-native";
import Config from 'react-native-config';

async function pressLoginbtn(id, password){
    console.log(`${Config.APIURL}/member/${id}`);
    
    const data = await fetch(`${Config.APIURL}/member/${id}`)
                .then(res => res.json())
                .catch(()=> {
                    console.log('에러');
                    return undefined;
                });
    if(data.error){
        console.log('해당 유저를 찾을 수 없음');
        return;
    }

    console.log(data);
    if(data.password === password){
        console.log('로그인 성공');
        
    }else{
        console.log('비밀번호가 틀렸습니다.');
        
    }

}

export default function Login(){

    const [id, setId] = useState('');
    const [password, setPassword] = useState(' ');

    return (
    <>
        <TextInput placeholder="id" style={styles.input} onChangeText={setId} value={id}/>
        <TextInput placeholder="password" style={styles.input} onChangeText={setPassword} value={password}/>
        <Button title="확인" onPress={()=>pressLoginbtn(id,password)}></Button>
    </>);
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
  