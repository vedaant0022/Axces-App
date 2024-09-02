


import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import UserCoin from '../../component/Profile/UserCoin';
import {
  bell,
  blueHeart,
  coinStack,
  defaultUserIc,
  downGrayArrow,
  Help,
  houseRound,
  Notification,
  plus,
  Privacy,
  Report,
  Tools,
  whiteHome,
  whiteWallet,
} from '../../constants/imgURL';
import OtherTile from './component/OtherTile';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/MainStack';
import { s, scale, verticalScale } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onGetBalance } from '../../redux/ducks/Coins/getBalance';
import { useAppSelector } from '../../constants';
import { onRecharge } from '../../redux/ducks/Coins/recharge';
import { deleteAccessToken, errorMessage, successMessage } from '../../utils';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import Loader from '../../component/Loader/Loader';
import PropertyInput from '../Listing/component/PropertyInput';
import { Alert } from 'react-native';
import { onGetUserProfile } from '../../redux/ducks/User/viewProfile';
import email from 'react-native-email';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SInfo from 'react-native-sensitive-info';
import { showMessage } from 'react-native-flash-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';



export interface OthersDataInterface {
  title: string;
  iconurl: string;
  navigateTo?: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const getBalance = useAppSelector((state) => state.getBalance);
  const recharge = useAppSelector((state) => state.recharge)
  const viewProfile = useAppSelector((state) => state.viewProfile)
  const dispatch = useDispatch()
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [demo, setdemo] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false);

  const handleEmail = (subject: string) => {
    const email = 'vedaantaws@gmail.com';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hello, I need support with...')}`;
    Linking.openURL(url).catch(err => console.error('Failed to open email link: ', err));
  };

  const fetchData = async () => {
    setRefreshing(true);
    dispatch(onGetBalance());
    dispatch(onGetUserProfile());
    setRefreshing(false);
  }
  

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    const displaybalance = () => {
      if (getBalance.called) {
        const { status, data } = getBalance;
        setdemo(getBalance);
        const coins = data.coins;
        setBalance(coins);
        setLoading(false);
      }
    }

    if (recharge.called) {
      const { status, message, data } = recharge;
      setLoading(false);
      if (status === 'fail') {
        errorMessage(message);
      } else {
        successMessage(message);
        if (data && data.coins !== undefined) {
          setBalance(data.coins);
          console.log("Coins after recharge: ", data.coins);
        }
      }
    }
    if (viewProfile.called) {
      const { message, code, data } = viewProfile?.data;
      setLoading(false);
      if (code === 200) {
        successMessage(message);
        setUserData(data);
      } else {
        errorMessage(message);
      }
    }
    displaybalance();
  }, [getBalance, recharge, demo, balance, setBalance, viewProfile]);

  console.log("userData>>>>", userData)


  const handleLogout = async () => {
    try {
      await deleteAccessToken();
      navigation.navigate('Onboard'); 
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  const handlePress = () => {
    Linking.openURL('https://www.axces.in/privacy_policy.html').catch(err => 
      console.error('Failed to open URL:', err)
    );
  };


  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1 bg-[#F2F8F6]">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <Header centerTile={true} title="Profile" RightComp={UserCoin} />
        <Loader loading={loading} />
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchData}
            />
          }
        >
          <View className="bg-[#181A53] px-6 pb-6 ">
            <View className=" w-full flex flex-row items-center justify-start">
              <View style={{ width: scale(80), height: verticalScale(80) }} className=" w-24 h-24 rounded-full mr-4">
                <Image
                  source={{ uri: defaultUserIc }}
                  resizeMode="contain"
                  className=" w-full h-full"
                />
              </View>
              <View>
                <Text style={{ fontSize: RFValue(20) }} className="text-white  font-boldB">{userData?.name}</Text>
                <Text style={{ fontSize: RFValue(16) }} className="text-white text-base font-sans">+91 {userData?.number}</Text>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('ProfileEditScreen'); dispatch(onGetUserProfile()); setLoading(true) }}
                  className=" px-6 py-2 rounded-full border border-[#BDEA09] mt-2">
                  <Text className=" text-[#BDEA09] text-base font-normal font-sans text-center">
                    Edit details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className=" flex flex-row mt-7">
              <View className=" flex-1 border-r border-r-[#F2F8F63D] pr-5 flex">
                <View className=" flex flex-row items-start">
                  <Image
                    style={{
                      width: scale(16),
                      height: verticalScale(16)
                    }}
                    source={{ uri: whiteHome }}
                    resizeMode="contain"
                    className="mr-2"
                  />
                  <Text style={{ fontSize: RFValue(14) }} className="text-white font-sans">Property Listed</Text>
                </View>
                <Text className=" text-white text-xl font-boldB my-2">0</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ListPropertyScreen')}
                  className=" rounded-full border border-[#BDEA09] flex items-center flex-row gap-2 py-1 mt-2 pb-2 pl-3"
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/748/748113.png' }}
                    style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    tintColor='#BDEA09'
                  />
                  <Text style={{ fontSize: RFValue(14) }} className=" text-[#BDEA09]  font-normal text-center font-sans">
                    List Property
                  </Text>
                </TouchableOpacity>

              </View>
              <View className=" flex-1 pl-5">
                <View className=" flex flex-row items-start">
                  <Image
                    style={{
                      width: scale(16),
                      height: verticalScale(16)
                    }}
                    source={{ uri: whiteWallet }}
                    resizeMode="contain"
                    className="mr-2"
                  />
                  <Text style={{ fontSize: RFValue(14) }} className="text-white font-sans">Wallet Balence</Text>
                </View>
                <Text style={{ fontSize: RFValue(14) }} className=" text-white  font-boldB my-2 text-xl">₹ {balance}</Text>
                <TouchableOpacity onPress={() => {
                  nocoinbottomSheetRef.current?.present();
                }} className="py-2 rounded-full border border-[#BDEA09] ">
                  <Text style={{ fontSize: RFValue(14) }} className=" text-[#BDEA09] font-normal font-sans text-center">
                    Add coins
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="  py-2 rounded-full border border-[#BDEA09] mt-2 ">
                  <Text style={{ fontSize: RFValue(14) }} className=" font-sans text-[#BDEA09] text-base font-normal text-center">
                    Withdraw coins
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="px-6 relative">
            <View className="z-20 w-full rounded-2xl p-4 bg-white shadow-md">
              <Text style={{ fontSize: RFValue(14) }} className=" text-[#0E0E0C] font-mediumM">
                Select feature to use
              </Text>
              <View className=" flex flex-row justify-between items-center border border-[#0E0E0C14] rounded-lg p-2 mt-2">
                <TouchableOpacity onPress={() => navigation.navigate('Home')} className=" flex flex-row items-center">
                  <Image
                    source={{ uri: houseRound }}
                    resizeMode="contain"
                    className=" w-5 h-5 mr-2"
                  />
                  <Text style={{ fontSize: RFValue(14) }} className=" text-[#0E0E0C] font-mediumM">
                    Buy/ Sell Property
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
            <View className="z-10 absolute top-0 left-0 right-0 h-6 bg-[#181A53]" />
          </View>
          <View className=" px-6 mt-5">
            <Text style={{ fontSize: RFValue(14) }} className=" text-[#0E0E0C99] mb-4">OTHERS</Text>
            
            {/* Wishlist */}
            <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <TouchableOpacity
                onPress={()=>{navigation.navigate('Wishlist')}}
                className=" flex flex-row items-center justify-start">
                <View
                  style={{ width: scale(32), height: verticalScale(32) }}
                  className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
                  <Image
                    style={{ width: scale(16), height: verticalScale(16) }}
                    source={{ uri: blueHeart }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{ fontSize: RFValue(14) }}
                  className="text-[#181A53] font-mediumM">
                  My Wishlist
                </Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{ width: scale(12), height: verticalScale(12) }}
                  source={{ uri: "https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png" }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </View>
            {/* Privacy */}
            <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <TouchableOpacity
               onPress={handlePress}
                className=" flex flex-row items-center justify-start">
                <View
                  style={{ width: scale(32), height: verticalScale(32) }}
                  className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
                  <Image
                    style={{ width: scale(16), height: verticalScale(16) }}
                    source={{ uri: Privacy }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{ fontSize: RFValue(14) }}
                  className="text-[#181A53] font-mediumM">
                  Account & Privacy
                </Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{ width: scale(12), height: verticalScale(12) }}
                  source={{ uri: "https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png" }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </View>
            {/* Notification */}
            <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <TouchableOpacity
                // onPress={() => {navigation.navigate(data?.navigateTo)}} 
                className=" flex flex-row items-center justify-start">
                <View
                  style={{ width: scale(32), height: verticalScale(32) }}
                  className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
                  <Image
                    style={{ width: scale(16), height: verticalScale(16) }}
                    source={{ uri: Notification }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{ fontSize: RFValue(14) }}
                  className="text-[#181A53] font-mediumM">
                  Notification
                </Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{ width: scale(12), height: verticalScale(12) }}
                  source={{ uri: "https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png" }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </View>
            {/* Report and fraud */}
            <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <TouchableOpacity
                onPress={handleEmail}
                className=" flex flex-row items-center justify-start">
                <View
                  style={{ width: scale(32), height: verticalScale(32) }}
                  className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
                  <Image
                    style={{ width: scale(16), height: verticalScale(16) }}
                    source={{ uri: Report }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{ fontSize: RFValue(14) }}
                  className="text-[#181A53] font-mediumM">
                  Report & Fraud
                </Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{ width: scale(12), height: verticalScale(12) }}
                  source={{ uri: "https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png" }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </View>
            {/* Help & support */}
            <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <TouchableOpacity
                onPress={handleEmail}
                className=" flex flex-row items-center justify-start">
                <View
                  style={{ width: scale(32), height: verticalScale(32) }}
                  className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
                  <Image
                    style={{ width: scale(16), height: verticalScale(16) }}
                    source={{ uri: Help }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{ fontSize: RFValue(14) }}
                  className="text-[#181A53] font-mediumM">
                  Help & Support
                </Text>
              </TouchableOpacity>
              <View>
                <Image
                  style={{ width: scale(12), height: verticalScale(12) }}
                  source={{ uri: "https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png" }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className=" w-full py-2 rounded-full bg-white shadow-lg my-4">
              <Text className=" text-[#181A53] text-base font-medium text-center">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomSheetModal
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              onPress={() => nocoinbottomSheetRef.current?.close()}
              opacity={0.2}
            />
          )}
          keyboardBehavior="interactive"
          ref={nocoinbottomSheetRef}
          snapPoints={['55%']}
          handleIndicatorStyle={{ height: 0 }}
          handleStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 28,
          }}>
          <BottomSheetView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1
              }}
              className="px-7">
              <View className=" flex bg-[#F2F8F6] rounded-lg flex-row justify-between items-center px-3 py-2">
                <Text className="text-[#181A53] text-lg">Your coins</Text>
                <Text className="text-[#181A53] text-lg">{balance}</Text>

              </View>
              <Text className="text-[#0E0E0C] text-2xl font-bold my-3">
                Recharge Now!!
              </Text>
              <Text className="text-[#0E0E0C] text-xl font-bold my-3">
                Amount
              </Text>
              <TextInput
                placeholder='Enter Amount'
                maxLength={5}
                keyboardType="numeric"
                value={amount}
                style={{ width: '100%', height: 50, borderRadius: 5, backgroundColor: '#F2F8F6', paddingHorizontal: 10, fontSize: 14, color: '#181A53' }}
                onChangeText={(text) => setAmount(text)}
              />
              <View style={{ height: 30 }} />
              <Text className=" text-[#0E0E0CCC] text-base font-medium border-b border-b-black/10">
                Two simple steps
              </Text>
              <View className=" flex flex-row w-full items-center justify-start mt-3">
                <View className="mr-4">
                  <Image
                    source={{ uri: coinStack }}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                </View>
                <Text className=" text-[#0E0E0C99] text-base">
                  Add AXCES coins to your wallet
                </Text>
              </View>
              <View className=" flex flex-row w-full items-center justify-start mt-3">
                <View className="mr-4">
                  <Image
                    source={{ uri: coinStack }}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                </View>
                <Text className=" text-[#0E0E0C99] text-base">
                  Seamlessly access to our services
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  nocoinbottomSheetRef.current?.close();
                  dispatch(onRecharge(amount));
                  setLoading(true)
                }}
                className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  Recharge Now
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ProfileScreen;
