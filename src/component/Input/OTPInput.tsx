// import React, {useState, useRef, useCallback} from 'react';
// import {
//   View,
//   TextInput,
//   TextInputKeyPressEventData,
//   Keyboard,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import Loader from '../Loader/Loader';
// import {useDispatch} from 'react-redux';
// import {onVerifyUser} from '../../redux/ducks/User/verifyUser';
// import {useAppSelector} from '../../constants';
// import {
//   errorMessage,
//   saveAccessToken,
//   saveUserId,
//   successMessage,
// } from '../../utils';

// const OTPInput = ({confirm, phoneNumber, isLoading}: any) => {
//   const maxLength = 1;
//   const inputsRef = useRef<TextInput[]>([]);
//   const [inputValues, setInputValues] = useState<string[]>(
//     new Array(6).fill(''),
//   );
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const verifyUser = useAppSelector(state => state.verifyUser);
//   const dispatch = useDispatch();

//   useFocusEffect(
//     useCallback(() => {
//       setLoading(false);
//       setInputValues(new Array(6).fill(''));
//     }, []),
//   );

//   const handleOnChangeText = (text: string, index: number) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = text;
//     setInputValues(newInputValues);

//     if (text && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleOnKeyPress = (
//     {nativeEvent: {key}}: {nativeEvent: TextInputKeyPressEventData},
//     index: number,
//   ) => {
//     if (key === 'Backspace' && !inputValues[index] && index > 0) {
//       // Focus previous input
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   async function verifyOtp(phoneNumber: string, otp: string) {
//     const url = 'http://axces-backend.onrender.com/api/verify-otp';
  
//     const data = {
//       phoneNumber: phoneNumber,
//       otp: otp,
//     };
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       // if (response.status === 400) {
//       //   const errorResponse = await response.json();
//       //   console.error('Error:', errorResponse.message);
//       //   throw new Error(errorResponse.message);
//       // }
  
//       const result = await response.json();
  
//       if (result.status === 'success') {
//         console.log('Success:', result.message);
//         successMessage(result.message);
        
//         return result;
//       } else {
//         errorMessage(result.message);
//       }
//     } catch (error) {
//       console.error('Verify OTP API Error:', error.message);
//       throw error;
//     }
//   }


//   async function verifyUserExists(phoneNumber: string) {
//     const url = 'http://axces-backend.onrender.com/api/user/verify';
//     const data = {
//       number: phoneNumber,
//     };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.status === 404) {
//         console.log('User not found:', result.message);
//         successMessage('OTP Successfully Verified..... Please Register');
//         // navigation.navigate('CreateAccScreen', {phoneNumber});
//       } else if (result.status === 'success') {
//         console.log('User verified:', result.message);
//         saveAccessToken(result.data.token);
//         saveUserId(result.data.id);
//         successMessage(result.message);
//         console.log(result.data.token);
//         console.log(result.data.id);
//         // navigation.navigate('Dashboard');
//       } else {
//         console.error('Verification error:', result.message);
//         errorMessage(result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       errorMessage('Error during user verification');
//     }
//   }

//   const handleVerifyPress = async () => {
//     const otp = inputValues.join('');
//     if (phoneNumber) {
//       setLoading(true);
//       try {
//         await verifyOtp(phoneNumber, otp);
//         await verifyUserExists(phoneNumber);
//       } catch (error) {
//         errorMessage('Error during OTP verification: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       errorMessage('Phone number is undefined');
//     }
//   };

//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           width: '100%',
//         }}>
//         <Loader loading={loading} />
//         {inputValues.map((value, index) => (
//           <TextInput
//             key={index}
//             style={{flex: 1, textAlign: 'center', fontSize: 16, marginRight: 4}}
//             value={value}
//             onChangeText={text => handleOnChangeText(text, index)}
//             onKeyPress={event => handleOnKeyPress(event, index)}
//             maxLength={maxLength}
//             ref={el => (inputsRef.current[index] = el as TextInput)}
//             keyboardType="number-pad"
//             className="bg-white/10 rounded-lg text-white/60"
//           />
//         ))}
//       </View>
//       <View
//         style={{position: 'absolute', top: 550}}
//         className="left-0 right-0 px-1">
//         <TouchableOpacity
//           onPress={handleVerifyPress}
//           className="w-full p-3 bg-[#BDEA09] rounded-full my-4">
//           <Text className="text-[#181A53] text-base text-center font-medium">
//             Verify
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OTPInput;
import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  TextInputKeyPressEventData,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../Loader/Loader';
import {useDispatch} from 'react-redux';
import {onVerifyUser} from '../../redux/ducks/User/verifyUser';
import {useAppSelector} from '../../constants';
import {
  errorMessage,
  saveAccessToken,
  saveUserId,
  successMessage,
} from '../../utils';

const OTPInput = ({confirm, phoneNumber, isLoading}: any) => {
  const maxLength = 1;
  const inputsRef = useRef<TextInput[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    new Array(6).fill(''),
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const verifyUser = useAppSelector(state => state.verifyUser);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setInputValues(new Array(6).fill(''));
    }, []),
  );

  const handleOnChangeText = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

  
    if (text && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOnKeyPress = (
    {nativeEvent: {key}}: {nativeEvent: TextInputKeyPressEventData},
    index: number,
  ) => {
    if (key === 'Backspace' && !inputValues[index] && index > 0) {
      // Focus previous input
      inputsRef.current[index - 1].focus();
    }
  };

  async function verifyOtp(phoneNumber: number, otp: number) {
    const url = 'http://axces-backend.onrender.com/api/verify-otp';
  
    const data = {
      phoneNumber: Number(phoneNumber), 
      otp: Number(otp),
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log('Response>>>',response);
      console.log('Result>>>',result);
      console.log('Data>>>',data);
      if (response.ok && result.status === 'success') {
        console.log('Success:', result.message);
        successMessage(result.message);
        return true; 
      } else {
        errorMessage(result.message);
        return false; 
      }
    } catch (error) {
      console.error('Verify OTP API Error:', error.message);
      errorMessage('An error occurred during OTP verification');
      return false;
    }
  }

  async function verifyUserExists(phoneNumber: string) {
    const url = 'http://axces-backend.onrender.com/api/user/verify';
    const data = {
      number: phoneNumber,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 404) {
        console.log('User not found:', result.message);
        successMessage('OTP Successfully Verified..... Please Register');
        navigation.navigate('CreateAccScreen', {phoneNumber});
      } else if (result.status === 'success') {
        console.log('User verified:', result.message);
        saveAccessToken(result.data.token);
        saveUserId(result.data.id);
        successMessage(result.message);
        console.log(result.data.token);
        console.log(result.data.id);
        navigation.navigate('Dashboard');
      } else {
        console.error('Verification error:', result.message);
        errorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage('Error during user verification');
    }
  }

  const handleVerifyPress = async () => {
    const otp = inputValues.join('');
    if (phoneNumber) {
      setLoading(true);
      try {
        const otpVerified = await verifyOtp(phoneNumber, otp);
        if (otpVerified) {
          await verifyUserExists(phoneNumber);
        }
      } catch (error) {
        errorMessage('Error during OTP verification: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      errorMessage('Phone number is undefined');
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Loader loading={loading} />
        {inputValues.map((value, index) => (
          <TextInput
            key={index}
            style={{flex: 1, textAlign: 'center', fontSize: 16, marginRight: 4}}
            value={value}
            onChangeText={text => handleOnChangeText(text, index)}
            onKeyPress={event => handleOnKeyPress(event, index)}
            maxLength={maxLength}
            ref={el => (inputsRef.current[index] = el as TextInput)}
            keyboardType="number-pad"
            className="bg-white/10 rounded-lg text-white/60"
          />
        ))}
      </View>
      <View
        style={{position: 'absolute', top: 550}}
        className="left-0 right-0 px-1">
        <TouchableOpacity
          onPress={handleVerifyPress}
          className="w-full p-3 bg-[#BDEA09] rounded-full my-4">
          <Text className="text-[#181A53] text-base text-center font-medium">
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPInput;
