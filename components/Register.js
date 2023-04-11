import { TextInput, Text, StyleSheet, Button, View, Dimensions  } from "react-native";
import useInput from "../hooks/useInput";
import Config from 'react-native-config';
import { useRef } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
function register(name, id, pass, pwConfirm){

    if(!name){
        Toast.show({
            type: 'error',
            text1: '회원가입 실패',
            text2: '이름을 입력해주세요'
        });
        return;
    }
    if(id.length < 4){
        Toast.show({
            type: 'error',
            text1: '회원가입 실패',
            text2: 'ID를 4자 이상 입력해주세요'
        });
        return;
    }
    if(pass < 5){
        Toast.show({
            type: 'error',
            text1: '회원가입 실패',
            text2: '비밀번호를 5자 이상 입력해주세요'
        });
        return;
    }
    if(pass !== pwConfirm) {
        Toast.show({
            type: 'error',
            text1: '회원가입 실패',
            text2: '비밀번호와 비밀번호 확인이 같아야 합니다'
        });
        return;
    }

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
  }).then(()=>{
    console.log('성공');
    
    Toast.show({
        type: 'success',
        text1: '회원가입 성공',
        text2: '회원가입에 성공하였습니다'
      });
  }).catch(()=>{
    console.log('실패');
    Toast.show({
        type: 'error',
        text1: '회원가입 실패',
        text2: '네트워크 상태 확인 후 다시 시도해 주세요'
      });
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
    const [pwConfirm,setpwConfirm] = useInput('');

    // const toastRef = useRef();
    return (
    <>
        <Text style={styles.title}>회원가입</Text>
        {/* onChangeText={setText} value={text} */}
        <View>
            <Text>이름</Text>
            <TextInput placeholder="" style={styles.input} onChangeText={setName} value={name}/>
            <Text>ID</Text>
            <TextInput placeholder="" style={styles.input} onChangeText={setId} value={id}/>
            <Text>비밀번호</Text>
            <TextInput placeholder="" style={styles.input} onChangeText={setPassword} value={password}/>
            <Text>비밀번호 확인</Text>
            <TextInput placeholder="" style={styles.input} onChangeText={setpwConfirm} value={pwConfirm}/>
        
        </View>
        <Button title="가입" onPress={() => register(name,id,password, pwConfirm)} /> 

    </>);
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        borderWidth: 1, // 경계선 두께
        borderColor: '#ccc', // 경계선 색상
        borderRadius: 5, // 경계선 라운드 처리
        paddingHorizontal: 10, // 가로 여백
        paddingVertical: 5, // 세로 여백
        width: 300,
    },
    title:{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        fontSize:30,
        fontWeight:"bold",
    }
});