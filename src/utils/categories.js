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
  { id: 'eggs-dairy', name: 'Eggs & Dairy', icon: faCheese },
  { id: 'leftovers', name: 'Leftovers', icon: faPizzaSlice },
  { id: 'fruits', name: 'Fruits', icon: faAppleAlt },
  { id: 'vegetables', name: 'Vegetables', icon: faCarrot },
  { id: 'meats', name: 'Meats', icon: faBacon },
  { id: 'breads', name: 'Breads', icon: faBreadSlice },
  { id: 'drinks', name: 'Drinks', icon: faWineGlassAlt },
  { id: 'condiments', name: 'Condiments', icon: faWineBottle },
];

export const FREEZER_CATEGORIES = [
  { id: 'frozen-meals', name: 'Frozen Meals', icon: faUtensils },
  { id: 'meats', name: 'Meats', icon: faBacon },
  { id: 'produce', name: 'Produce', icon: faCarrot },
  { id: 'desserts', name: 'Desserts', icon: faIceCream },
  { id: 'misc-ingredients', name: 'Misc. Ingredients', icon: faEllipsisH },
];

export const ALL_CATEGORIES = FRIDGE_CATEGORIES.concat(FREEZER_CATEGORIES);

export function isFridgeCategory(catId) {
  return FRIDGE_CATEGORIES.some(({ id }) => id === catId);
}
export function isFreezerCategory(catId) {
  return FREEZER_CATEGORIES.some(({ id }) => id === catId);
}
