import { useState } from "react";
import { Button, TextInput, StyleSheet, Text, Modal, Image,View, TouchableOpacity } from "react-native";
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




export default function Login({navigation }){
    // const { data, isLoading, isError, refetch } = useQuery(['user'], loginUser);
    const queryClient = useQueryClient();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(true);

    //QR 토큰 state
    const [token, setToken] = useState(undefined);
    
    const pressLoginbtn = async (id, password, navigation ) => {    
        const userdata =await loginUser();
        // queryClient.setQueryData(['user'], userdata);
        //TODO: 로그인 실패 로직 추가
        storeData('user',userdata);
        navigation.navigate('Main');
    }

    const logout = async ()=>{
        removeData('user');
        setToken(undefined);
    }
    
    const qrLogin = async ()=>{
        setModalVisible(true);
        const userData = await getData('user');
        setToken(userData.token);
    }

    return (
        <View className="bg-slate-50 h-full flex justify-center items-center">
            <View>
                <Text>ID</Text>
                <TextInput placeholder="" className="w-[300px] h-[40px] border-[1px] rounded-lg border-black" onChangeText={setId} value={id}/>
            </View>
            <View className="mt-5">
                <Text>PASSWORD</Text>
                <TextInput secureTextEntry={true} className="w-[300px] h-[40px] border-[1px] rounded-lg border-black" onChangeText={setPassword} value={password}/>
            </View>
            <TouchableOpacity className="w-[300px] bg-slate-50">
                <Text className="h-4 ml-auto">회원가입</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>pressLoginbtn(id,password, navigation )} className="w-[300px] h-10 mt-5 rounded-lg bg-blue-300 flex justify-center items-center">
                <Text className="text-xl font-bold">로그인</Text>
            </TouchableOpacity>

        


        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1, // 경계선 두께
        borderColor: '#ccc', // 경계선 색상
        borderRadius: 5, // 경계선 라운드 처리
        paddingHorizontal: 10, // 가로 여백
        paddingVertical: 5, // 세로 여백
        width: 300,
        marginTop: 20,
    }
});
  