import {Image, Text, View} from 'react-native';
import {whiteCoin} from '../../constants/imgURL';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import getBalance, { onGetBalance } from '../../redux/ducks/Coins/getBalance';
import { useAppSelector } from '../../constants';
import { onGetUserProfile } from '../../redux/ducks/User/viewProfile';
import { useNavigation } from '@react-navigation/native';

const UserCoin = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const getBalance = useAppSelector((state) => state.getBalance);
  const recharge = useAppSelector((state) => state.recharge)
  const viewProfile = useAppSelector((state) => state.viewProfile)
  const dispatch = useDispatch()

  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [demo, setdemo] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    dispatch(onGetBalance());
    dispatch(onGetUserProfile());
    setRefreshing(false);
  }

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


    displaybalance();
  }, [getBalance, recharge, demo, balance, setBalance, viewProfile]);
  return (
    <View className=" bg-[#F2F8F6]/20 rounded-full px-4 py-2 flex flex-row items-center">
      <Image
        style={{width: scale(20), height: verticalScale(20)}}
        source={{uri: whiteCoin}}
        className=" mr-2"
        resizeMode="contain"
      />
      <Text style={{fontSize: RFValue(12)}} className=" text-[#F2F8F6]">
        {balance} Coins
      </Text>
    </View>
  );
};

export default UserCoin;
