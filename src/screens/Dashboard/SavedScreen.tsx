import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import { tapIcon } from '../../constants/imgURL';
import PropertyCard from '../../component/Card/PropertyCard';
import CenterHeader from '../../component/Header/CenterHeader';
import { FlatList } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { viewWishList } from '../../redux/ducks/WishList/viewList';
import { useAppSelector } from '../../constants';
import { errorMessage, successMessage } from '../../utils';
import { RootState } from '../../redux/store';
import Loader from '../../component/Loader/Loader';
import { useFocusEffect } from '@react-navigation/native';

const SavedScreen = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const getWishlist = useAppSelector((state) => state.viewList)
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(viewWishList())
    setLoading(true)
    },[dispatch])
  )

  useEffect(() => {
    if (getWishlist.called) {
      const { data, status, message } = getWishlist
      setLoading(false)
      if (status === 'success') {
        console.log('Properties found')
        setList(data)
        if (data?.length === 0) {
          errorMessage('No saved properties found')
        }
      }
      else {
        errorMessage(message)
      }
    }
  }, [getWishlist])

  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <CenterHeader title="My Wishlist" lightMode={true} />
      {/* <Header
        centerLeftPercen={40}
        lightHeader={true}
        centerTile={true}
        title="My Wishlist"
      /> */}
      <Loader loading={loading}/>
      <ScrollView className="flex-1 bg-[#F2F8F6] px-6 pt-6">
        <View className=" flex flex-row items-center justify-start">
          <Text className=" text-[#0E0E0C] text-lg font-bold mr-2">
            Saved properties
          </Text>
          <View className=" rounded-full bg-[#BDEA09] w-6 h-6 flex items-center justify-center">
            <Text className=" text-[#181A53] text-sm font-medium">{list?.length}</Text>
          </View>
        </View>
        {/* <View className=" flex flex-row items-end justify-start my-4">
          <Image
            source={{ uri: tapIcon }}
            resizeMode="contain"
            className=" w-5 h-5 mr-2"
          />
          <Text className=" text-[#0E0E0C99] text-sm">
            Tap on heart button to remove property
          </Text>
        </View> */}
        <View className=" w-full mb-4 mt-4">
          <FlatList data={list} keyExtractor={(item) => item?._id} renderItem={({ item }) => <PropertyCard item={item} isWishlist={true} />} />
        </View>
        {/* <View className=" w-full mb-4">
          <PropertyCard />
        </View>
        <View className=" w-full mb-4">
          <PropertyCard />
        </View> */}
        <View className=' w-full h-[5vh]' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
