import {
  faAppleAlt,
  faCarrot,
  faCheese,
  faBreadSlice,
  faBacon,
  faIceCream,
  faUtensils,
  faWineBottle,
  faWineGlassAlt,
  faPizzaSlice,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

export const FRIDGE_CATEGORIES = [
  { path: encodeURIComponent('eggs & dairy'), name: 'Eggs & Dairy', icon: faCheese },
  { path: encodeURIComponent('leftovers'), name: 'Leftovers', icon: faPizzaSlice },
  { path: encodeURIComponent('fruits'), name: 'Fruits', icon: faAppleAlt },
  { path: encodeURIComponent('vegetables'), name: 'Vegetables', icon: faCarrot },
  { path: encodeURIComponent('meats'), name: 'Meats', icon: faBacon },
  { path: encodeURIComponent('breads'), name: 'Breads', icon: faBreadSlice },
  { path: encodeURIComponent('drinks'), name: 'Drinks', icon: faWineGlassAlt },
  { path: encodeURIComponent('condiments'), name: 'Condiments', icon: faWineBottle },
];

export const FREEZER_CATEGORIES = [
  { path: encodeURIComponent('frozen meals'), name: 'Frozen Meals', icon: faUtensils },
  { path: encodeURIComponent('meats'), name: 'Meats', icon: faBacon },
  { path: encodeURIComponent('produce'), name: 'Produce', icon: faCarrot },
  { path: encodeURIComponent('desserts'), name: 'Desserts', icon: faIceCream },
  { path: encodeURIComponent('misc. ingredients'), name: 'Misc. Ingredients', icon: faEllipsisH },
];
