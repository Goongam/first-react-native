import { useQuery,useInfiniteQuery } from "react-query";
import { FlatList, StyleSheet, View, SafeAreaView,StatusBar  } from "react-native";
import { Text } from "react-native";
import { useState } from "react";
function fetchData(pageNumber) {
    return fetch(`https://swapi.dev/api/people/?page=${pageNumber}`).then((res) => res.json());
  }


const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

let page = 1;
const initialUrl = 'https://swapi.dev/api/people/?page='

const fetchUrl = async (url) => {
    // console.log(url);
    const response = await fetch(url);
    return response.json();
  };
const LIMIT = 10;
export default function List(){
    const { 
        data,//데이터
        fetchNextPage, //pageParam에 저장된 다음url을 불러옴
        hasNextPage, //pageParam에 url이 저장되 있는지 확인
        isLoading, 
        isError, 
        error, 
        isFetching } = useInfiniteQuery(
            ["sw-people"], //쿼리키
            ({pageParam = initialUrl+'1'})=> fetchUrl(pageParam), //실제 데이터 불러옴
            {
                getNextPageParam: (lastPage, allPages) => {
                    const nextPage =
                        allPages.length < LIMIT ? initialUrl+(allPages.length + 1) : undefined;
                    return nextPage;
                }//pageParam 관리함수
            }
    );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

let results = [];
data.pages.forEach((pageData)=>{
    pageData.results?.forEach(data =>{
        results.push(data);
    })
})

  
  return (
    <SafeAreaView>
    <FlatList
      data={results}
      renderItem={({ item }) => {
        console.log(item.name);
        // console.log(page);
        
        return (
            <Item title={item.name} />
        )
      }}
      keyExtractor={(item) => item.name}
      onEndReached={() => {
        // console.log('----end----');
        fetchNextPage();
      }}
      onEndReachedThreshold={0.1}
    />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });