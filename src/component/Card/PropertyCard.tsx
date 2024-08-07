import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CardSwiper from './CardSwiper';
import {
  deleteIc,
  demoUser,
  editPen,
  ratingstar,
  rightArrowWhite,
  setwishlist,
  wishlist,
} from '../../constants/imgURL';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/MainStack';
import { useDispatch } from 'react-redux';
import { addToWishList } from '../../redux/ducks/WishList/addToList';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../constants';
import { errorMessage, successMessage } from '../../utils';
import { onGetProperty } from '../../redux/ducks/Properties/getSelectedProperty';
import { onGetOwnerDetails } from '../../redux/ducks/User/contactOwner';

interface Props {
  editFlag?: boolean;
  item?: any;
  isWishlist?: boolean;
}

const PropertyCard: React.FC<Props> = ({ editFlag, item, isWishlist = false }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const addToList = useAppSelector((state) => state.addToList);
  const contactOwner = useAppSelector((state) => state.contactOwner);
  const [isWishlisted, setIsWishlisted] = useState(isWishlist);

  useEffect(() => {
    if (addToList.called) {
      const { message, status } = addToList;
      if (status === 'fail') {
        errorMessage(message);
      } else {
        successMessage(message);
        setIsWishlisted(true);
      }
    }
    if (contactOwner.called) {
      const { message, status } = contactOwner;
      if (status === 'fail') {
        errorMessage(message);
      } else if (status === 'success') {
        successMessage(message);
        navigation.navigate('ContactOwner');
      }
    }

  }, [addToList, contactOwner]);

  const handlePropertyPress = () => {
    if (!editFlag) {
      navigation.push('PropertyScreen', { data: item });
      dispatch(onGetProperty(item?._id));
    }
  };

  return (
    <ScrollView 
    contentContainerStyle={{flex:1, justifyContent:'center', alignSelf:'center'}}
    style={{ marginBottom: 20 ,}}>
      <TouchableOpacity onPress={handlePropertyPress} style={{ width: '100%' }}>
        <View className="w-full bg-white rounded-xl">
          <View className="w-full h-[129px] rounded-t-xl overflow-hidden relative">
            <CardSwiper images={item?.images} />
            <View className="p-2 rounded-full bg-black/25 absolute w-8 h-8 right-2 top-1/3">
              <Image source={{ uri: rightArrowWhite }} resizeMode="contain" className="w-4 h-4" />
            </View>
          </View>
          <View className="p-3">
            {editFlag && (
              <View className="flex flex-row items-center">
                <Image source={{ uri: ratingstar }} resizeMode="contain" className="w-3 h-3 mr-1" />
                <Text className="text-sm text-black font-medium mr-1">4.5</Text>
                <Text className="text-sm text-gray-700 font-medium">{'(73)'}</Text>
              </View>
            )}
            <View className="flex flex-row items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#1A1E25]">{item?.building_name}</Text>
                <Text className="text-base text-[#2F4858]">{item?.address}</Text>
              </View>
              <TouchableOpacity onPress={() => { dispatch(addToWishList(item?._id)); setIsWishlisted(!isWishlisted) }}>
                <Image
                  source={{ uri: isWishlisted ? setwishlist : wishlist }}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-start p-1 rounded-md bg-[#F2F8F6] mt-1 mb-3">
              <Text className="text-sm text-[#738D9C]">{item?.bedrooms} BHK</Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">{item?.area_sqft} Sq.ft</Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">{item?.furnish_type}</Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">{item?.owner_name}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex flex-row ">
              <Text className="text-base font-bold text-[#BDEA09]"> ₹ {item?.monthly_rent}/-</Text>
              <Text style={{color:'#000000'}} className="text-base font-bold ml-1 "> Monthly</Text>
              </View>
              <View>
                <Text style={{color:'#000000'}} className="text-base font-bold ml-1"> {item?.listing_type}</Text>
              </View>
            </View>
          </View>
          {editFlag ? (
            <View className="px-3 pb-3 flex flex-row">
              <TouchableOpacity
                onPress={() => { }}
                className="flex-1 p-3 mr-2 border border-[#BDEA09] rounded-full flex flex-row items-center justify-center"
              >
                <Text className="text-[#BDEA09] text-base text-center font-medium mr-2">Edit Details</Text>
                <Image source={{ uri: editPen }} resizeMode="contain" className="w-4 h-4" />
              </TouchableOpacity>
              <TouchableOpacity className="p-4 rounded-full bg-[#EA0909]/10 flex items-center justify-center">
                <Image source={{ uri: deleteIc }} resizeMode="contain" className="w-4 h-5" />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center px-3 pt-3 border-t border-t-gray-400">
                <View>
                  <Image source={{ uri: demoUser }} resizeMode="contain" className="w-10 h-10 rounded-full" />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(onGetOwnerDetails(item?._id));
                  }}
                  className="flex-1 rounded-full ml-3 bg-[#BDEA09] p-3"
                >
                  <Text className="text-center text-base font-bold text-[#181A53]">Contact Owner</Text>
                </TouchableOpacity>
              </View>
              <View className="px-3 pb-3 mt-2 flex flex-row justify-between items-center">
                <Text className="text-sm text-[#181A5399] font-medium">Charges</Text>
                <Text className="text-[#181A53] text-base font-bold">50 Coins</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyCard;

