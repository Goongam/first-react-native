import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Register from './Register';

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
    // console.log(data);
    
    return (
    <View>
        {/* {data.map(a => 
            <Text key={a.idx}>{a.id} / {a.name} / {a.password}</Text>
        )} */}
        <Register />
    </View>);
}