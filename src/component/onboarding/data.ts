import {demoBuilding} from '../../constants/imgURL';

export interface swipeItemInterface {
  id: string;
  imgURL: string;
  title: string;
  description: string;
}

export const swiperData: swipeItemInterface[] = [
  {
    id: '45',
    imgURL: demoBuilding,
    title: 'Explore to turn your dreams into reality',
    description: 'Your all-in-one destination for housing solutions',
  },
  {
    id: '18',
    imgURL: demoBuilding,
    title: 'Find, view and own your new home- in one step',
    description: 'Step into tomorrow by find your new home now',
  },
  {
    id: '07',
    imgURL: demoBuilding,
    title: 'Home in sight, just a click away',
    description: 'Your perfect matchis closer than you think explore now',
  },
];
