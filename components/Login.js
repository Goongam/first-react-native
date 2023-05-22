import { useState } from "react";
import { Button, TextInput, StyleSheet, Text } from "react-native";
import Config from 'react-native-config';
import { useQuery, useQueryClient } from "react-query";
import { getData, removeData, storeData } from "../service/storage";

async function pressLoginbtn_before(id, password){
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

const loginUser = () =>
  fetch('http://ibdabackend.iptime.org:5001/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: 'test1',
      password: 'password1'
    })
  }).then(response => response.json());




export default function Login(){
    // const { data, isLoading, isError, refetch } = useQuery(['user'], loginUser);
    const queryClient = useQueryClient();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    
    const pressLoginbtn = async (id, password) => {    
        const userdata =await loginUser();
        // queryClient.setQueryData(['user'], userdata);
        storeData('user',userdata);
    }

    const test = async ()=>{
        // console.log(queryClient.getQueryData('user'));
        console.log(await getData('user'));
    }

    const logout = async ()=>{
        removeData('user');
    }
    

    return (
    <>
        <Text>ID</Text>
        <TextInput placeholder="" style={styles.input} onChangeText={setId} value={id}/>
        <Text>PASSWORD</Text>
        <TextInput placeholder="" style={styles.input} onChangeText={setPassword} value={password}/>
        <Button title="확인" onPress={()=>pressLoginbtn(id,password)}></Button>
        <Button title="로그아웃" onPress={()=>logout()}></Button>
        <Button title="쿼리테스트" onPress={()=>test()}></Button>
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
        marginBottom: 20,
    }
});
  