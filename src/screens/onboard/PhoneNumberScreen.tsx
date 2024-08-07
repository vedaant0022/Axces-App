import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import { whitePhoneIc } from '../../constants/imgURL';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';
import firebase from '../../../firebaseConfig';
import { useCallback, useEffect, useState } from 'react';
import { errorMessage, saveAccessToken, saveUserId, successMessage } from '../../utils';
import Loader from '../../component/Loader/Loader';
import { useDispatch } from 'react-redux';
import { onVerifyUser } from '../../redux/ducks/User/verifyUser';
import { useAppSelector } from '../../constants';

const PhoneNumberScreen = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      setLoading(false)
    }, [])
  )

  // async function signInWithPhoneNumber(number: string) {
  //   if (number === '') {
  //     errorMessage('Please enter phone number')
  //     return
  //   }
  //   if (number?.length < 10) {
  //     errorMessage('Please enter valid phone number')
  //     return
  //   }
  //   setLoading(true)
  //   Keyboard.dismiss()
   
  //   const confirmation = await firebase.auth().signInWithPhoneNumber("+91" + number)
  //   navigation.navigate('OtpVerifyScreen', { confirm: confirmation, phoneNumber })
  // }

  const sendOtp = async () => {
    
    if (!phoneNumber) {
      errorMessage('Please enter your phone number');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://axces-backend.onrender.com/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const responseData = await response.json();

      if (response.ok) {
        successMessage(responseData.message);
        setLoading(false);
        navigation.navigate('OtpVerifyScreen', {phoneNumber})
      } else {
        errorMessage( responseData.message || 'Failed to send OTP');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      errorMessage('An error occurred while sending OTP. Please try again.');
    }
  };
  return (
    <KeyboardAvoidingView className=" flex-1">
      <SafeAreaView className=" flex-1 relative">
        <Loader loading={loading} />
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <CenterHeader
          HeaderIc={
            'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
          }
        />
        <View className="flex-1  bg-[#181A53] px-6 pt-14">
          <Text className=" text-white text-2xl font-bold">
            Let’s get started..
          </Text>
          <Text className=" text-base text-white/60 my-3">
            Where every step forward brings you closer to your dreams
          </Text>
          <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
            <Image
              source={{ uri: whitePhoneIc }}
              resizeMode="contain"
              className=" w-4 h-4 mr-2"
            />
            <View className=" flex flex-row items-start">
              <Text className="text-base text-white/60 mr-1 mt-[2px]">+91</Text>
              <TextInput
                style={{
                  paddingVertical: 1.5,
                  textAlignVertical: 'center',
                }}
                value={phoneNumber}
                // onChangeText={(value) => setPhoneNumber(value)}
                onChangeText={setPhoneNumber}
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor="#FFFFFF99"
                className=" text-base text-white/60 flex-1"
                keyboardType='number-pad'
              />
            </View>
          </View>
        </View>
        <View className=' absolute bottom-0 left-0 right-0 px-6'>
          <TouchableOpacity
            onPress={() => {
              
              sendOtp()
            }}
            className="w-full p-3 bg-[#BDEA09] rounded-full my-4">
            <Text className="text-[#181A53] text-base text-center font-medium">
              Next
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PhoneNumberScreen;
