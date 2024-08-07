import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserCoin from '../../component/Profile/UserCoin';
import Header from '../../component/Header/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultUserIc, whiteHome} from '../../constants/imgURL';
import EditTile from './component/EditTile';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onEditProfile } from '../../redux/ducks/Auth/editProfile';
import { useAppSelector } from '../../constants';
import { errorMessage, successMessage } from '../../utils';
import Loader from '../../component/Loader/Loader';

const ProfileEditScreen = () => {
  const [editName, setEditName] = useState('');
  const [editMail, setEditMail] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [loading, setLoading] = useState(false);


  const editProfile = useAppSelector(state => state.editProfile)
  const viewProfile = useAppSelector((state) => state.viewProfile)

  const dispatch = useDispatch()

  useEffect(() => {
    if (editProfile.called) {
      setLoading(false)
      const {message, code} = editProfile
      if (code === 200){
        successMessage(message)
      }
      else {
        errorMessage(message)
      }
    }
    if (viewProfile.called) {
      const { message, code, data} = viewProfile?.data;
      setLoading(false);
      if (code === 200) {
        console.log("view profile", data)
        successMessage(message);
        setEditMail(data?.email);
        setEditName(data?.name);
        setEditNumber(data?.number?.toString());
      } else {
        errorMessage(message);
      }
    }
  }, [editProfile, viewProfile])

  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="Profile" RightComp={UserCoin} />
      <Loader loading={loading}/>
      <ScrollView className="flex-1">
        <View className="bg-[#181A53] px-6 py-6 ">
          <View className=" w-full flex  items-center justify-center">
            <View className=" w-24 h-24 rounded-full">
              <Image
                source={{uri: defaultUserIc}}
                resizeMode="contain"
                className=" w-full h-full"
              />
            </View>
            <View className=" flex items-center justify-center mt-1">
              <Text className="text-white font-bold text-2xl">{editName}</Text>
              <Text className="text-white text-base my-1">+91 {editNumber}</Text>
            </View>
          </View>
        </View>
        <View className=" flex-1 px-6">
          <EditTile onChangeText={(value: string) => setEditName(value)} type="Your name" value={editName} editable={true} />
          <EditTile
            type="E-mail"
            value={editMail}
            onChangeText={(value: string) => setEditMail(value)}
            editable={true}
          />
          <EditTile type="Mobile Number" value={editNumber} onChangeText={(value: string) => setEditNumber(value)} editable={true} />
        </View>

        {/* bottom placeholder */}
        <View className="w-full h-[10vh]" />
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
          <TouchableOpacity
            onPress={() => {dispatch(onEditProfile(editName, editMail)); setLoading(true); Keyboard.dismiss()}}
            className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
            <Text className="text-[#181A53] text-base font-medium text-center">
              Save
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
