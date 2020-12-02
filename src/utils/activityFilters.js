import shallowFilter from './shallowStringFilter';
import { has, cloneDeep } from 'lodash';

const containsAllTheMaterial = (filters) => ({ materialList }) =>
  Object.values(filters.materials).every(({ id }) =>
    materialList.map(({ id }) => id).includes(id),
  );

const isCategory = (filters) => ({ category }) =>
  category <= filters.category.value;

const lesserThanTiming = (filters) => ({ timing }) => timing <= filters.timing;

const isBetweenTheAges = (filters) => ({ ageMin, ageMax }) =>
  ageMin >= filters.ages[0] && ageMax <= filters.ages[1];

export default (data, filters) => {
  let results = cloneDeep(data);

  if (filters.text) results = shallowFilter(results, filters.text);

  if (filters.materials && has(results, '[0].materialList')) {
    results = results.filter(containsAllTheMaterial(filters));
  }
  if (filters.category) {
    results = results.filter(isCategory(filters));
  }
  if (filters.timing) {
    results = results.filter(lesserThanTiming(filters));
  }
  if (filters.ages) {
    results = results.filter(isBetweenTheAges(filters));
  }

  return results;
};
