import {Animated, FlatList, View} from 'react-native';
import CardSwipeItem from './CardSwipeItem';
import {demoBuilding} from '../../constants/imgURL';
import {useRef} from 'react';
import CardSwipeIndicator from './CardSwipeIndicator';

export interface PropertyImgInterface {
  id: string;
  url: string;
}

export const propertyImgData: PropertyImgInterface[] = [
  {
    id: 'demo1',
    url: demoBuilding,
  },
  {
    id: 'demo2',
    url: demoBuilding,
  },
  {
    id: 'demo3',
    url: demoBuilding,
  },
  {
    id: 'demo4',
    url: demoBuilding,
  },
];

interface Props {
  images?: Array<string>;
}

const CardSwiper:  React.FC<Props> = ({images}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View className="w-full h-full relative">
      <FlatList
        data={images}
        renderItem={(item) => <CardSwipeItem url={item?.item?.startsWith('http://') ? item?.item?.replace('http://', 'https://') : item?.item}/>}
        pagingEnabled={true}
        keyExtractor={index => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      <View className="absolute bottom-1 right-0 left-0">
        <CardSwipeIndicator data={images} scrollX={scrollX} />
      </View>

      {/* <CardSwipeItem /> */}
    </View>
  );
};

export default CardSwiper;
