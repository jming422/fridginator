const VALID_LOCATIONS = ['fridge', 'freezer', 'pantry'];

function locationIsValid(loc) {
  return !loc || VALID_LOCATIONS.includes(loc);
}

module.exports = { VALID_LOCATIONS, locationIsValid };
