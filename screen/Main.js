import {View, Text, Button} from 'react-native'
export default function Main({navigation}){

    return (
        <View className="w-full h-full flex justify-start items-center">
            <Button 
            title="로그인" 
            onPress={() => navigation.navigate('Login')}
            />
            {/* <Button 
            title="회원가입" 
            onPress={() => navigation.navigate('Register')}
            /> */}
        </View>
    );
}