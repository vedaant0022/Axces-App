import { FlatList, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import PropertyCard from '../../component/Card/PropertyCard';
import { useEffect, useState } from 'react';
import Loader from '../../component/Loader/Loader';
import { errorMessage } from '../../utils';

const RentPropertyListing = () => {
  const [list, setList] = useState([]);
  const [latitude, setLatitude] = useState<number>(40);  // Updated latitude to 40
  const [longitude, setLongitude] = useState<number>(38);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const url = `https://backend.axces.in/api/property/list`;

      try {
        const response = await fetch(url, {
          method: 'POST',  // Changed to POST
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userLatitude: latitude,
            userLongitude: longitude,
            filters: {},
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Log the fetched data
        console.log("Fetched Data:", result);

        const filteredData = result.data.filter(property => property.listing_type === 'rent');
        setList(filteredData);
      } catch (error) {
        errorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [latitude, longitude]);

  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={true} />
      <Loader loading={loading} />
      <ScrollView className="flex-1 px-6 pt-6">
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

export default RentPropertyListing;









// Redux code
// import { FlatList, ScrollView, StatusBar, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../component/Header/Header';
// import PropertyCard from '../../component/Card/PropertyCard';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getPropertiesList } from '../../redux/ducks/Properties/getProperties';
// import { useAppSelector } from '../../constants';
// import Loader from '../../component/Loader/Loader';
// import { errorMessage } from '../../utils';

// const RentPropertyListing = () => {
//   const [list, setList] = useState([]);
//   const [latitude, setLatitude] = useState<number>(45);
//   const [longitude, setLongitude] = useState<number>(38);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const propertiesList = useAppSelector((state) => state.getProperties);

//   useEffect(() => {
//     dispatch(getPropertiesList(latitude, longitude, '', '', '', 'buy'));
//     setLoading(true);
//   }, [dispatch, latitude, longitude]);

//   useEffect(() => {
//     if (propertiesList.called) {
//       setLoading(false);
//       const { data, message, status } = propertiesList;
//       if (status === 'fail') {
//         errorMessage(message);
//       } else {
//         const filteredData = data.filter(property => property.listing_type === 'rent');
//         setList(filteredData);
//       }
//     }
//   }, [propertiesList]);

//   return (
//     <SafeAreaView className="flex-1 bg-[#F2F8F6]">
//       <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//       <Header showSearch={true} />
//       <Loader loading={loading} />
//       <ScrollView className="flex-1 px-6 pt-6">
//         <View className="w-full mb-4">
//           <FlatList
//             contentContainerStyle={{ gap: 20 }}
//             data={list}
//             renderItem={({ item }) => <PropertyCard item={item} />}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RentPropertyListing;
