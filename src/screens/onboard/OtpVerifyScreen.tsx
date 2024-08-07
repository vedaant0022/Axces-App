import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import OTPInput from '../../component/Input/OTPInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';
import { errorMessage } from '../../utils';
import { useEffect, useState } from 'react';
import firebase from '../../../firebaseConfig';

const OtpVerifyScreen = () => {
    const navigation = useNavigation<OnboardingNavigationProp>();
    const route = useRoute();
    // const { phoneNumber } = route?.params;
    const [phoneNumber, setPhoneNumber] = useState<number>(route?.params?.phoneNumber)
    const [confirm, setConfirm] = useState<number>(route?.params?.confirm);

  return (
    <KeyboardAvoidingView className=" flex-1">
      <SafeAreaView className=" flex-1 relative">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <CenterHeader
          HeaderIc={
            'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
          }
        />
        <View className="flex-1  bg-[#181A53] px-6 pt-14">
          <Text className=" text-white text-2xl font-bold">
            OTP verification
          </Text>
          <Text className=" text-base text-white/60 my-3">
            We have sent a verification code on your mobile number{' '}
            <Text className=" text-[#BDEA09]">+91 {phoneNumber}</Text>
          </Text>
          <View className=" w-full mt-2">
            <OTPInput confirm={confirm} phoneNumber={phoneNumber}/>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerifyScreen;
