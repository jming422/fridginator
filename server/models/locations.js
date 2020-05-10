const VALID_LOCATIONS = ['fridge', 'freezer'];

function locationIsValid(loc) {
  return !loc || VALID_LOCATIONS.includes(loc);
}

module.exports = { VALID_LOCATIONS, locationIsValid };
