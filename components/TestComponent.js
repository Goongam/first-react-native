import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import Register from './Register';
import Login from './Login';
import UserInfoForm from './Update';

async function getData(){
    const res = await fetch("http://182.225.65.132:20212/members")
    const json = await res.json();
    return json;
}

export default function TestComponent(){

    const [data, setData] = useState([]);

    useEffect(()=>{
        getData()
        .then((data)=>{
            setData(data);
        });
        
    },[]);
    
    return (
    <View>
        <ScrollView>
        {/* {data.map(a => 
            <Text key={a.idx}>{a.id} / {a.name} / {a.password}</Text>
        )} */}
        {/* <Register /> */}
        {/* <Login /> */}
        <UserInfoForm userId={'1'} password={'2'} name={'3'} gender={"m"} phone={"123"} email={'sad'} onSubmit={()=>console.log('submit!')}/>
        </ScrollView>
    </View>);
}