// import {  } from "react-native-gesture-handler";
import {View, Text, Image, Modal, TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons'; 

export default function QRCodeGenerator({setModalVisible, token}){
    return <>

        <View className="relative overflow-visible h-[420px] mt-auto bg-neutral-50">
                            
            <View className="h-10 flex justify-center">
                <Text className="ml-auto mr-2 text-xl text-zinc-400">IBDA</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} className="absolute -top-5 left-5 bg-black h-10 w-10 rounded-full flex justify-center items-center">
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>

            <View className="w-full h-full flex">
                <Image className="w-full h-80" source={{uri:`https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=${token}`}}></Image>
                <Text className="text-xl mx-auto"> QR코드를 리더기에 인식해주세요</Text>
            </View>

        </View>

    </>
}