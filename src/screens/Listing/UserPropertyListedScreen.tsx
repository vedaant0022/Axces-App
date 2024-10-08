import { Image, ScrollView, StatusBar, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CenterHeader from "../../component/Header/CenterHeader"
import { tapIcon } from "../../constants/imgURL"
import PropertyCard from "../../component/Card/PropertyCard"

const UserPropertyListedScreen = () => {
    return  <SafeAreaView className="flex-1 bg-[#F2F8F6]">
    <StatusBar
      barStyle={'dark-content'}
      backgroundColor={'transparent'}
      translucent
    />
    <CenterHeader title="Property Listed" lightMode={true} />
    <ScrollView className="flex-1 bg-[#F2F8F6] px-6 pt-6">

      <View >

      <View className=" flex flex-row items-center justify-start mb-4">
        <Text className=" text-[#0E0E0C] text-lg font-bold mr-2">
          Listed properties
        </Text>
        <View className=" rounded-full bg-[#BDEA09] w-6 h-6 flex items-center justify-center">
          <Text className=" text-[#181A53] text-sm font-medium">5</Text>
        </View>
      </View>
      
      <View 
      className=" w-full h-[360px] mb-4">
        <PropertyCard editFlag={true} />
      </View>
      <View className=" w-full h-[360px] mb-4">
        <PropertyCard editFlag={true} />
      </View>
      <View className=" w-full h-[360px] mb-4">
        <PropertyCard editFlag={true} />
      </View>
      <View className=' w-full h-[5vh]' />
      </View>
    </ScrollView>
  </SafeAreaView>
}

export default UserPropertyListedScreen


