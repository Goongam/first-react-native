import { useQuery } from "react-query";
import { FlatList, StyleSheet, View, SafeAreaView,StatusBar  } from "react-native";
import { Text } from "react-native";
function fetchData(pageNumber) {
    return fetch(`https://swapi.dev/api/people/?page=${pageNumber}`).then((res) => res.json());
  }

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function List(){
    let page = 1;
  const { data, isLoading, isFetching, fetchMore } = useQuery('data', () => fetchData(page));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log(fetchMore);
  
//   console.log('data:',data.results);
  const results = data.results;
//   console.log(results);
  
  return (
    <SafeAreaView>
    <FlatList
      data={results}
      renderItem={({ item }) => {
        console.log(item.name);
        return (
            <Item title={item.name} />
        )
      }}
      keyExtractor={(item) => item.name}
      onEndReached={() => {
        // console.log('----end----');
        fetchMore(++page);
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