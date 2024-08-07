import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  BackHandler,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  bell,
  buyHouse,
  faqChatBot,
  greenDown,
  homeBanner,
  key,
  location,
  offerBanner,
  searchIcon,
  showcaseHome,
} from '../../constants/imgURL';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/MainStack';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {onGetLocation} from '../../redux/ducks/User/getLocation';
import {useAppSelector} from '../../constants';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';
import Loader from '../../component/Loader/Loader';
import {errorMessage} from '../../utils';

const MAX_LENGTH = 28;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentLocation, setCurrentLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude, setLatitude] = useState(45);
  const [longitude, setLongitude] = useState(30);
  const [refreshing, setRefreshing] = useState(false);

  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 200, // Adjust as needed
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const dispatch = useDispatch();
  const getLocation = useAppSelector(state => state.getLocation);
  const viewProfile = useAppSelector(state => state.viewProfile);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit the onboarding process?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true;
      });
      setLoading(false);
    }, []),
  );

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(
              onGetLocation(
                position.coords.latitude,
                position.coords.longitude,
              ),
            );
            setLatitude(position?.coords?.latitude);
            setLongitude(position?.coords?.longitude);
          },
          error => {
            console.log('Error:', error);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('You cannot use Geolocation');
      }
    } catch (err) {
      return false;
    }
  };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(onGetLocation(latitude, longitude)), // Refresh location
        dispatch(onGetUserProfile()), // Refresh user profile
      ]);
      setRefreshing(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    fetchData();
  }, []);

  const fetchSuggestions = async (query: string) => {
    setInput(query);
    if (query.trim().length === 0) {
      setSuggestions([]);
      setModalVisible(false);
      return;
    }

    try {
      const response = await fetch(
        `https://axces-backend.onrender.com/api/auto?query=${query}`,
        {
          method: 'GET',
        },
      );
      const responseData = await response.json();
      const {data} = responseData;
      setSuggestions(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setModalVisible(false);
    }
  };
  // const handleSelectSuggestion = (item: any) => {
  //   setInput(item?.place_name);
  //   const { latitude, longitude } = item?.coordinates;
  //   setLatitude(latitude);
  //   setLongitude(longitude);
  //   setModalVisible(false);
  // };
  const handleSelectSuggestion = (item: any) => {
    setInput(item?.place_name);
    const {latitude, longitude} = item?.coordinates;
    setLatitude(latitude);
    setLongitude(longitude);
    setModalVisible(false);
  };

  useEffect(() => {
    if (getLocation.called) {
      const {data} = getLocation;
      setCurrentLocation(data?.display_name);
      console.log(currentLocation);
    }
    if (viewProfile.called) {
      const {data} = viewProfile?.data;
      setLoading(false);
      setUserData(data);
    }
  }, [viewProfile, getLocation, currentLocation]);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength ) + '...';
    }
    return text;
  };

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Loader loading={loading} />
      <ScrollView
        className="z-10 flex-1 bg-[#F2F8F6]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }>
        {/* Top Section */}
        <View
          style={{paddingTop: insets.top}}
          className="overflow-visible w-full relative h-[60vh] rounded-b-2xl pb-8">
          <View className="z-20 px-6 pt-6 flex flex-row justify-between items-center">
            <View>
              <Text className="text-white/60 font-medium text-lg ml-7 mb-2">
                Current Location
              </Text>
              <View className="flex flex-row justify-start items-center">
                <Image
                  source={{uri: location}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <View style={{width: 255}} className="flex flex-row ml-2">
                  <Text className="text-base font-medium text-white">
                    {currentLocation
                      ? trimText(currentLocation, MAX_LENGTH)
                      : 'Fetching...'}
                  </Text>
                  {/* <Image source={{ uri: greenDown }} resizeMode="contain" className="w-3 aspect-auto ml-1" /> */}
                </View>
              </View>
            </View>
            <TouchableOpacity className="bg-white/10 rounded-full flex items-center justify-center w-10 h-10">
              <Image
                source={{uri: bell}}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <View className="z-20 px-6 absolute bottom-0 left-0 right-0">
            <Text className="text-2xl text-white font-medium">
              {getGreeting()} {userData?.name} !
            </Text>
            <View style={{flex: 1, padding: 16}}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 25,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Image
                  source={{uri: searchIcon}}
                  style={{width: 20, height: 20, marginRight: 8}}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Search your dream home here"
                  placeholderTextColor="white"
                  style={{color: 'white', width: '90%'}}
                  value={input}
                  onChangeText={text => fetchSuggestions(text)}
                />
              </View>

              {modalVisible && suggestions.length > 0 && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 85,
                    left: 16,
                    right: 16,
                    backgroundColor: '#f3f9f6',
                    borderRadius: 10,
                    zIndex: 1000,
                    height: dropdownHeight,
                    opacity: dropdownOpacity,
                    overflow: 'hidden',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    
                  }}>
                  {suggestions.map((item: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectSuggestion(item)}
                      style={{
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#181A53',
                          paddingBottom: 10,
                        }}>
                        {item.place_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>
            <View className="bg-white p-3 mt-4 rounded-2xl">
              <Text className="text-[#0E0E0C] text-base font-bold mb-3">
                What are you looking for today?
              </Text>
              <View className="flex flex-row">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PropertyListing', {
                      latitude,
                      longitude,
                      
                    })
                  }
                  className="flex-1 flex flex-row items-center justify-center mr-2 rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: buyHouse}}
                    resizeMode="contain"
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-[#181A53] font-medium text-base">
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RentPropertyListing')}
                  className="flex-1 flex flex-row items-center justify-center rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: key}}
                    resizeMode="contain"
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-[#181A53] font-medium text-base">
                    Rent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={{uri: homeBanner}}
            resizeMode="cover"
            className="w-full z-10 h-full absolute top-0 bottom-0 left-0 right-0 rounded-b-3xl"
          />
        </View>
        {/* Want to showcase */}
        <View className="px-6 my-6">
          <View className="flex flex-row w-full bg-white rounded-xl">
            <View className="flex-1 flex justify-between p-4">
              <Text className="text-xl text-[#181A53] font-bold">
                Want to showcase your property?
              </Text>
              <Text className="text-[#181A5399] text-sm">
                Boost your income by renting or selling your property
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListPropertyScreen',{currentLocation})}
                className="p-3 rounded-full border border-[#BDEA09]">
                <Text className="text-[#BDEA09] text-base font-normal text-center">
                  List Here
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: showcaseHome}}
              resizeMode="cover"
              className="w-[40%] h-[30vh] rounded-tr-xl rounded-br-xl"
            />
          </View>
        </View>
        {/* Offer */}
        {/* <View className="px-6 mb-6">
          <View className="relative w-full px-4 pb-4 rounded-xl">
            <View className="absolute top-0 left-0 right-0 flex items-center justify-center z-20 mx-auto">
              <View className="bg-white/40 w-[90%] flex flex-row justify-between items-center px-2 py-1 rounded-b-xl">
                <Text className="text-white text-sm">Use code</Text>
                <Text className="text-base font-bold text-white">FAB50</Text>
              </View>
            </View>
            <View className="mt-10 z-20 flex flex-row justify-between items-center">
              <View>
                <Text className="text-white text-4xl font-bold">5% off</Text>
                <Text className="text-white text-base">on car wash</Text>
              </View>
              <TouchableOpacity className="bg-white/30 rounded-full">
                <Text className="text-white text-base py-3 px-8">Book now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: offerBanner}}
              resizeMode="cover"
              className="absolute top-0 left-0 right-0 bottom-0 rounded-xl z-10"
            />
          </View>
        </View> */}
        {/* Check history */}
        <View className="px-6 mb-6">
          <View className="flex flex-row w-full bg-white rounded-xl p-4">
            <View className="flex-1">
              <Text className="text-base font-medium text-[#181A53]">
                Check your recent views
              </Text>
            </View>
            <TouchableOpacity className="flex-1 p-3 rounded-full border border-[#BDEA09]">
              <Text className="text-[#BDEA09] text-base font-medium text-center">
                Check history
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* FAQ */}
        <View className="px-6 mb-6">
          <View className="w-full bg-white rounded-xl">
            <View className="flex flex-row w-full">
              <View className="flex-1 flex justify-between p-4">
                <Text className="text-xl text-[#181A53] font-bold">
                  Got stuck? Check our FAQ
                </Text>
                <Text className="text-[#181A5399] text-sm">
                  Unlock insights with our user-friendly FAQ guide
                </Text>
              </View>
              <View className="w-[40%] flex items-center justify-center">
                <Image
                  source={{uri: faqChatBot}}
                  resizeMode="contain"
                  className="w-24 h-24 rounded-tr-xl rounded-br-xl"
                />
              </View>
            </View>
            <View className="px-4 pb-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('FaqScreen')}
                className="p-3 rounded-full border border-[#BDEA09]">
                <Text className="text-[#BDEA09] text-base font-normal text-center">
                  View FAQ's
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserPropertyListedScren')}>
            <Text className="text-black font-bold text-base my-6">
              Test mode: Propertylisted Screen Click
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
