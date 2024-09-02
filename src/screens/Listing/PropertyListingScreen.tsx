import { Dimensions, FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import PropertyCard from '../../component/Card/PropertyCard';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Loader from '../../component/Loader/Loader';
import { errorMessage } from '../../utils';
import colors from '../../utils/colors';

const PropertyListingScreen = () => {
  const [list, setList] = useState([]);
  const [latitude, setLatitude] = useState<number>(45);
  const [longitude, setLongitude] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const route = useRoute();
  const { appliedFilters } = route?.params || {};

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.latitude !== undefined && route?.params?.longitude !== undefined) {
        setLatitude(route?.params?.latitude);
        setLongitude(route?.params?.longitude);
      }
    }, [route])
  );

  useEffect(() => {
    if (Array.isArray(appliedFilters)) {
      setFilteredData(appliedFilters);
    } else {
      setFilteredData([]);
    }
  }, [appliedFilters]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const url = `https://backend.axces.in/api/property/list`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include other necessary headers here
          },
          body: JSON.stringify({
            userLatitude: latitude,
            userLongitude: longitude,
            filters: appliedFilters || {},
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Log the fetched data
        console.log("Fetched Data:", result);

        if (result.data !== null) {
          const filteredData = result.data.filter(property => property.listing_type === 'buy');
          setList(filteredData);
        }
      } catch (error) {
        errorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [latitude, longitude, appliedFilters]);

  const renderData = ({ item }: any) => {
    console.log("item>>>", item);
    return (
      <View style={{
        backgroundColor: '#4f517c',
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 12,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Text style={{ color: 'white', fontSize: 14 }}>{item?.filterName + ": "}</Text>
        <Text style={{ color: 'white', fontSize: 14 }}>{item?.value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={true} />
      <Loader loading={loading} />
      <FlatList
        data={filteredData}
        renderItem={renderData}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.primary, paddingVertical: 15, marginBottom: 15 }}
      />
      <ScrollView className='mt-2'>
        <View className="w-full mb-4">
          <FlatList
            contentContainerStyle={{ gap: 20 }}
            data={list}
            renderItem={({ item }) => <PropertyCard item={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyListingScreen;








// Old code

// import { FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../component/Header/Header';
// import PropertyCard from '../../component/Card/PropertyCard';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getPropertiesList } from '../../redux/ducks/Properties/getProperties';
// import { useAppSelector } from '../../constants';
// import Loader from '../../component/Loader/Loader';
// import { errorMessage } from '../../utils';



// const PropertyListingScreen = () => {

//   const [list, setList] = useState([]);
//   const [latitude, setLatitude] = useState<number>(45);
//   const [longitude, setLongitude] = useState<number>(38);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const propertiesList = useAppSelector((state) => state.getProperties);

//   useEffect(() => {
//     dispatch(getPropertiesList(latitude, longitude, '', '', ''))
//     setLoading(true)
//   }, [])

//   useEffect(() => {
//     if (propertiesList.called) {
//       setLoading(false)
//       const { data, message, status } = propertiesList
//       if (status === 'fail') {
//         errorMessage(message)
//       }
//       setList(data)
//     }
//   }, [propertiesList])

//   return (
//     <SafeAreaView className="flex-1 bg-[#F2F8F6]">
//       <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//       <Header showSearch={true} />
//       <Loader loading={loading} />
//       <ScrollView className=" flex-1 px-6 pt-6">
//         <View className=" w-full mb-4">
//           <FlatList
//             contentContainerStyle={{ gap: 20 }}
//             data={list}
//             renderItem={({ item }) =>
//               <PropertyCard item={item} />} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PropertyListingScreen;

