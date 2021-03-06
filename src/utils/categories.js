import _ from 'lodash';

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
  faBirthdayCake,
  faLemon,
  faDrumSteelpan,
  faGlassCheers,
  faCookieBite,
  faPepperHot,
} from '@fortawesome/free-solid-svg-icons';

export const FRIDGE_CATEGORIES = [
  { id: 'eggs-dairy', name: 'Eggs/Dairy', icon: faCheese },
  { id: 'leftovers', name: 'Leftovers', icon: faPizzaSlice },
  { id: 'fruits', name: 'Fruits', icon: faAppleAlt },
  { id: 'vegetables', name: 'Veggies', icon: faCarrot },
  { id: 'meats', name: 'Meats', icon: faBacon },
  { id: 'breads', name: 'Breads', icon: faBreadSlice },
  { id: 'drinks', name: 'Drinks', icon: faWineGlassAlt },
  { id: 'condiments', name: 'Condiments', icon: faWineBottle },
  { id: 'desserts', name: 'Desserts', icon: faBirthdayCake },
  { id: 'misc', name: 'Misc.', icon: faEllipsisH },
];

export const FREEZER_CATEGORIES = [
  { id: 'frozen-meals', name: 'Frozen Meals', icon: faUtensils },
  { id: 'meats', name: 'Meats', icon: faBacon },
  { id: 'produce', name: 'Produce', icon: faCarrot },
  { id: 'desserts', name: 'Desserts', icon: faIceCream },
  { id: 'misc', name: 'Misc.', icon: faEllipsisH },
];

export const PANTRY_CATEGORIES = [
  { id: 'grains', name: 'Grains & Baking', icon: faBreadSlice },
  { id: 'produce', name: 'Produce', icon: faLemon },
  { id: 'snacks', name: 'Snacks & Candy', icon: faCookieBite },
  { id: 'canned', name: 'Canned Goods', icon: faDrumSteelpan },
  { id: 'drinks', name: 'Drinks', icon: faGlassCheers },
  { id: 'spices', name: 'Spices & Condiments', icon: faPepperHot },
  { id: 'desserts', name: 'Desserts', icon: faBirthdayCake },
  { id: 'misc', name: 'Misc.', icon: faEllipsisH },
];

export const ALL_CATEGORIES = _(FRIDGE_CATEGORIES).concat(FREEZER_CATEGORIES, PANTRY_CATEGORIES).uniqBy('id').value();

export function isFridgeCategory(catId) {
  return FRIDGE_CATEGORIES.some(({ id }) => id === catId);
}
export function isFreezerCategory(catId) {
  return FREEZER_CATEGORIES.some(({ id }) => id === catId);
}
export function isPantryCategory(catId) {
  return PANTRY_CATEGORIES.some(({ id }) => id === catId);
}

/**
 * If the provided category exists for only one location, this
 * function returns that location. Otherwise, it returns null.
 */
export function getUniqueLocation(cat) {
  if (isFridgeCategory(cat) && !isFreezerCategory(cat) && !isPantryCategory(cat)) {
    return 'fridge';
  } else if (!isFridgeCategory(cat) && isFreezerCategory(cat) && !isPantryCategory(cat)) {
    return 'freezer';
  } else if (!isFridgeCategory(cat) && !isFreezerCategory(cat) && isPantryCategory(cat)) {
    return 'pantry';
  } else {
    return null;
  }
}

export function idToName(categoryId) {
  return _.chain(ALL_CATEGORIES)
    .find(({ id }) => id === categoryId)
    .get('name')
    .value();
}
