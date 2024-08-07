import {Image,ScrollView,StatusBar,Text,TouchableOpacity,} from 'react-native';
import {View} from 'react-native';
import Header from '../../component/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropertyCarousel from '../../component/Carousel/Property/PropertyCarousel';
import PropertyDscr from './component/PropertyDscr';
import PropertyDetail from './component/PropertyDetails';
import {demoUser} from '../../constants/imgURL';
import Facilities from './component/Facilities';
import {useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import ContactOwner from './component/ContactOwner';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { useAppSelector } from '../../constants';
import { errorMessage } from '../../utils';

const PropertyScreen = ({route}:any) => {
  const getSelectedProperty = useAppSelector((state) => state.getSelectedProperty)

  const [user, setUser] = useState<any>();
  // const route = useRoute();
  const {data}: any = route?.params

  

  const [activeSection, setActiveSection] = useState('All');
  

  useEffect(() => {
    if (getSelectedProperty.called) {
      const {data, message, status} = getSelectedProperty;
        setUser(data)
    }
  },[getSelectedProperty])

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'All':
        return (
          <>
            <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
              <PropertyDscr item={data} />
            </View>
            <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
              <PropertyDetail item={data} />
            </View>
            <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
              <Facilities item={data} />
            </View>
          </>
        );
      case 'Description':
        return (
          <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
            <PropertyDscr item={data} />
          </View>
        );
      case 'Details':
        return (
          <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
            <PropertyDetail item={data} />
          </View>
        );
      case 'Facilities':
        return (
          <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
            <Facilities item={data} />
          </View>
        );
      case 'Owner':
        return (
          <View style={{ paddingHorizontal: 24, marginBottom: 12,height:200, width:327,marginTop:5 ,backgroundColor:'#fff',alignItems:'center',alignSelf:"center",justifyContent:'center',borderRadius:25}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',gap:50}}>
              <View>
                <Image
                source={{uri: demoUser}}
                style={{ width: 62, height: 62, borderRadius: 60 }}
                />
                <Text style={{color:'#181A53',fontWeight:'500',fontSize:16,paddingTop:5}}>Charges</Text>
              </View>
              <View>
              <Text style={{fontSize:17,color:'#000000',fontWeight:'500',}}>+91-9999955555</Text>

              <View style={{ width:149, backgroundColor: '#BDEA09',height:50,justifyContent:'center',alignItems:'center',borderRadius:30,marginTop:8}}>
                <TouchableOpacity
                  style={{flex:1,justifyContent:'center'}}
                >
                  <Text style={{ color: '#000000', fontWeight: '600' }}>
                    Contact Owner
                  </Text>
                </TouchableOpacity>
              </View>              
              </View>
            </View>
            
          </View>
        );
      default:
        return null;
    }
  };

  return (
   
      <SafeAreaView className="flex-1 bg-[#F2F8F6]">
        <ScrollView>
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <View >
        <Header />
        </View>
        <ScrollView className="flex-1">
          <View className="w-full h-[35vh] pt-4 relative">
            <PropertyCarousel id={data} images={data?.images}/>
            <View className="bg-[#181A53] w-full h-[70%] z-10 absolute top-0" />
          </View>
          <View className="px-6 pt-2">
            <View className=" flex flex-row justify-between">
              <Text className=" text-base font-bold text-[#0E0E0C]">
                  {data?.building_name}
              </Text>
              <View className=" flex flex-row">
                <Text className=" text-base font-bold text-[#BDEA09]">
                  {data?.monthly_rent}
                </Text>
                <Text className=" text-base font-bold ml-1 text-[#180E0E99]">
                  / Monthly
                </Text>
              </View>
            </View>
            <Text className=" text-[#0E0E0C99] text-sm">
              {data?.address}, {data?.landmark}
            </Text>
            
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', marginTop: 16, marginBottom: 16 }}
          >
            <View style={{ width: 24 }} />
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: activeSection === 'All' ? '#BDEA09' : 'transparent' }}
              onPress={() => setActiveSection('All')}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: activeSection === 'Description' ? '#BDEA09' : 'transparent' }}
              onPress={() => setActiveSection('Description')}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>Description</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: activeSection === 'Details' ? '#BDEA09' : 'transparent' }}
              onPress={() => setActiveSection('Details')}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: activeSection === 'Facilities' ? '#BDEA09' : 'transparent' }}
              onPress={() => setActiveSection('Facilities')}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>Facilities</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: activeSection === 'Owner' ? '#BDEA09' : 'transparent' }}
              onPress={() => setActiveSection('Owner')}
            >
              <Text style={{ fontSize: 16, color: 'black' }}>Owner</Text>
            </TouchableOpacity>
          </ScrollView>
          {renderActiveSection()}
          
          
        </ScrollView>
        </ScrollView>
      </SafeAreaView>
   
  );
};

export default PropertyScreen


