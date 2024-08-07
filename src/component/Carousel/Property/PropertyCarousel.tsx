import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {propertyImgData} from '../../Card/CardSwiper';
import ProptertyCarouselItem from './PropertyCarouselItem';
import {setwishlist, wishlist} from '../../../constants/imgURL';
import { addToWishList } from '../../../redux/ducks/WishList/addToList';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../constants';
import { errorMessage, successMessage } from '../../../utils';

interface Prop {
  images?: Array<string>,
  id: string,
  isWishlist?: boolean
}
const PropertyCarousel: React.FC<Prop> = ({id,images, isWishlist = false}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isWishlisted, setIsWishlisted] = useState(isWishlist);
  const dispatch = useDispatch();
  const addToList = useAppSelector((state) => state.addToList);

  useEffect(() => {
    if (addToList.called) {
      const { message, status } = addToList
      if (status === 'fail') {
        errorMessage(message)
      }
      else {
        successMessage(message)
      }
    }
  }, [addToList])

  return (
    <View className=" w-full h-full z-20 relative">
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <ProptertyCarouselItem
            scrollX={scrollX}
            item={item?.startsWith('http://') ? item?.replace('http://', 'https://') : item}
            index={index}
            length={images?.length}
          />
        )}
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={index => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={() => <View style={{height: 250, width: 20}} />}
        ListFooterComponent={() => <View style={{height: 250, width: 20}} />}
      />
      <TouchableOpacity onPress={() => {dispatch(addToWishList(id)); setIsWishlisted(!isWishlisted)}} className=" absolute right-8 top-4 w-8 h-8 flex items-center justify-center p-3 rounded-full bg-white">
        <Image
          source={{uri: isWishlisted ? setwishlist : wishlist}}
          resizeMode="contain"
          className=" w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PropertyCarousel;
