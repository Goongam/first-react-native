import { getData, removeData } from "./storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const qrLogin = async (setQRModalVisible, setToken)=>{
    const user = await getData('user');

    if(!user) {
        console.log('로그인 부탁');
        
        Toast.show({
            type: 'error',
            text1: '로그인 시 이용 가능합니다',
            // text2: '비밀번호를 5자 이상 입력해주세요'
        });
        return;
    }
    setQRModalVisible(true);
    setToken(user.token);
}

export const qrLogout = async (setToken)=>{
    removeData('user');
    setToken(undefined);
    Toast.show({
        type: 'success',
        text1: '로그아웃 되었습니다.',
    });
}