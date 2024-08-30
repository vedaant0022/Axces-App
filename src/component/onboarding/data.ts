import {demoBuilding, Swiper2, Swiper3} from '../../constants/imgURL';

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
    imgURL: Swiper2,
    title: 'Find, view and own your new home- in one step',
    description: 'Your all-in-one destination for housing solutions',
  },
  {
    id: '07',
    imgURL: Swiper3,
    title: 'Home in sight, just a click away',
    description: 'Your perfect matchis closer than you think explore now',
  },
];
