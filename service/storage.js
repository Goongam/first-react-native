import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        // 'tasks' 라는 항목에 tasks 저장
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // saving error
    }
}

// 자료 불러오기
export const getData = async (key) => {
    try {
 
        const loadedData = await AsyncStorage.getItem(key);

        const data = JSON.parse(loadedData) || undefined;

        return data;
    } catch(e) {
        // error reading value
    }
}

export const removeData = async (key) => {
    try{
        await AsyncStorage.removeItem(key);
        return '삭제 완료';
    }catch{

    }
}