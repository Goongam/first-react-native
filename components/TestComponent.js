import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

async function getData(){
    const res = await fetch("https://api.manana.kr/exchange/rate/KRW/JPY,USD,KRW.json")
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
    console.log(data);
    
    return (
    <View>
        {data.map(a => 
            <Text>{a.date} / {a.name} / {a.rate}</Text>
        )}
    </View>);
}