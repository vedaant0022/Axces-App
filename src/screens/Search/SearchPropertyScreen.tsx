import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../component/Loader/Loader';
import {getPropertiesList} from '../../redux/ducks/Properties/getProperties';
import Slider from '@react-native-community/slider';
import SearchFilter from './SearchFilter';
import {RootStackParamList} from '../../routes/MainStack';
import {pinIcon} from '../../constants/imgURL';

export type filterNameType =
  | 'Pincode'
  | 'Add Localities'
  | 'Looking for'
  | 'Purpose'
  | 'Property Type'
  | 'Listed by'
  | 'Size'
  | 'Prize'
  | 'Built Up Area'
  | 'Furnish Type'
  | 'Preferred Tenant'
  | 'Looking to'
  | 'Property Facilities'
  | "I'm";

interface filterInterface {
  filterName: filterNameType;
  filterVariant: 'Select' | 'Range' | 'String';
  values?: string[];
}

const filters: filterInterface[] = [
  {
    filterName: 'Add Localities',
    filterVariant: 'Select',
  },
];

const SearchPropertyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addPincode, setAddPincode] = useState<string>('');
  const [lookingFor, setLookingFor] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [propType, setPropType] = useState<string>('');
  const [listedFor, setListedFor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(45);
  const [longitude, setLongitude] = useState<number>(38);
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const [Rentprice, setRentPrice] = useState(0);
  const [area, setArea] = useState(0);
  const [furnish, setFurnish] = useState('');
  const [preferred, setPreferred] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
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
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use Geolocation');
          Geolocation.getCurrentPosition(
            position => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            error => {
              console.log('Error>>>', error);
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
    requestLocationPermission();
  }, []);

  const updateFiltersArray = () => {
    let appliedFilters = [];

    if (addPincode)
      appliedFilters.push({filterName: 'Pincode', value: addPincode});
    if (lookingFor)
      appliedFilters.push({filterName: 'Looking for', value: lookingFor});
    if (purpose) appliedFilters.push({filterName: 'Purpose', value: purpose});
    if (propType)
      appliedFilters.push({filterName: 'Property Type', value: propType});
    if (listedFor)
      appliedFilters.push({filterName: 'Listed by', value: listedFor});
    if (size) appliedFilters.push({filterName: 'Size', value: size});
    if (price) appliedFilters.push({filterName: 'Prize', value: price});
    if (area) appliedFilters.push({filterName: 'Built Up Area', value: area});
    if (furnish)
      appliedFilters.push({filterName: 'Furnish Type', value: furnish});
    if (preferred)
      appliedFilters.push({filterName: 'Preferred Tenant', value: preferred});

    dispatch(
      getPropertiesList(
        latitude,
        longitude,
        propType,
        addPincode,
        size[0],
        'buy',
      ),
    );

    navigation.navigate('PropertyListing', {appliedFilters});
  };

  const formatPrice = value => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹ ${(value / 1000).toFixed(2)} L`;
    }
  };

  // const formatRentPrice = value => {
  //   if (value >= 100000) {
  //     return `₹ ${(value / 100000).toFixed(2)} L`;
  //   } else {
  //     return `₹ ${(value / 1000).toFixed(2)} K`;
  //   }
  // };
  const formatRentPrice = (value: any) => {
    if (value >= 10000000) {
      // 1 Crore and above
      return `₹ ${(value / 10000000).toFixed(0)} Cr`;
    } else if (value >= 100000) {
      // 1 Lakh and above
      return `₹ ${(value / 100000).toFixed(0)} L`;
    } else if (value >= 1000) {
      // 1 Thousand and above
      return `₹ ${(value / 1000).toFixed(0)} K`;
    } else {
      // Less than 1 Thousand
      return `₹ ${value}`;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={true} />
      <Loader loading={loading} />
      <ScrollView className="flex-1 py-6 bg-white">
        <View className="py-3 px-4 mx-6 flex flex-row items-center rounded-full bg-[#F2F8F6]">
          <Image
            source={{uri: pinIcon}}
            resizeMode="contain"
            className="w-2 h-5 mr-2"
          />
          <TextInput
            placeholder="Enter your pincode"
            placeholderTextColor="#181A53"
            className="text-[#181A53] text-base font-medium flex-1"
            value={addPincode}
            onChangeText={(value: string) => setAddPincode(value)}
          />
        </View>

        <View className=" flex items-start mx-6 mt-4">
          <Text className=" text-[#0E0E0C] text-base font-bold mb-3">
            Add Localities
          </Text>
          <TouchableOpacity className=" py-3 px-8 rounded-full bg-[#BDEA09]">
            <Text className=" text-[#181A53] text-base font-medium">
              Add locality
            </Text>
          </TouchableOpacity>
        </View>

        <SearchFilter
          filterName="Looking for"
          options={['Buy', 'Rent']}
          value={lookingFor}
          onSelectHandler={setLookingFor}
        />
        <SearchFilter
          filterName="Purpose"
          options={['Residential', 'Commercial']}
          value={purpose}
          onSelectHandler={setPurpose}
        />
        <SearchFilter
          filterName="Property Type"
          options={[
            'Apartment',
            'Independent House',
            'Builder floor',
            'Villa',
            'Studio',
            'Pent house',
          ]}
          value={propType}
          onSelectHandler={setPropType}
        />
        <SearchFilter
          filterName="Listed by"
          options={['Agent', 'Owner']}
          value={listedFor}
          onSelectHandler={setListedFor}
        />
        <SearchFilter
          filterName="Bedrooms"
          options={['1 BHK', '2 BHK', '3 BHK', '4 BHK']}
          value={size}
          onSelectHandler={setSize}
        />

        <View style={{padding: 16, backgroundColor: '#FFF'}}>
          {/* Buy Property */}
          {/* <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Text
                style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
                Buy Range
              </Text>
              <Text
                style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
                {formatPrice(price)}
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={40000000}
              step={100000}
              value={price}
              onValueChange={setPrice}
              minimumTrackTintColor="#BDEA09"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#BDEA09"
            />
          </View> */}

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Text
                style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
                Price Range
              </Text>
              <Text
                style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
                {formatRentPrice(Rentprice)}
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={50000000}
              step={100000}
              value={Rentprice}
              onValueChange={setRentPrice}
              minimumTrackTintColor="#BDEA09"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#BDEA09"
            />
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>₹ 0</Text>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>₹ 4L</Text>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <Text style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
              Built Up Area
            </Text>
            <Text style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
              {area} Sq.ft.
            </Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={3000}
            step={50}
            value={area}
            onValueChange={setArea}
            minimumTrackTintColor="#BDEA09"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#BDEA09"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>0 Sq.ft.</Text>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>3000 Sq.ft.</Text>
          </View>
        </View>

        <SearchFilter
          filterName="Furnished Type"
          options={['Fully furnished', 'Semi Furnished', 'Un Furnished']}
          value={furnish}
          onSelectHandler={setFurnish}
        />

        <SearchFilter
          filterName="Preferred Tenant"
          options={['Any', 'Family', 'Bachelors']}
          value={preferred}
          onSelectHandler={setPreferred}
        />

        {/* bottom placeholder */}
        <View className="w-full h-[10vh]" />
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
        <TouchableOpacity
          onPress={() => {
            updateFiltersArray();
          }}
          className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
          <Text className="text-[#181A53] text-base font-medium text-center">
            View Property
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchPropertyScreen;
