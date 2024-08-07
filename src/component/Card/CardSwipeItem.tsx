import {Image, View, useWindowDimensions} from 'react-native';

interface Props {
  url?: string;
}

const CardSwipeItem: React.FC<Props> = ({url}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width - 48}} className="flex-1">
      <Image
        source={{uri: url}}
        resizeMode="cover"
        className=" w-full h-full"
      />
    </View>
  );
};

export default CardSwipeItem;
