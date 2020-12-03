import shallowFilter from './shallowStringFilter';
import { has, cloneDeep, isObject, isNil, isEmpty } from 'lodash';

const containsAllTheMaterial = (filters) => ({ materialList }) =>
  Object.values(filters.materials).every(({ id }) =>
    materialList.map(({ id }) => id).includes(id),
  );

const isCategory = (filters) => ({ category }) =>
  category <= filters.category.value;

const lesserThanTiming = (filters) => ({ timing }) => timing <= filters.timing;

const isBetweenTheAges = (filters) => ({ ageMin, ageMax }) =>
  ageMin >= filters.ages[0] && ageMax <= filters.ages[1];

const greaterRating = (filters) => ({ averageRating }) =>
  averageRating >= filters.rating.ratings;

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
  if (filters.rating) {
    results = results.filter(greaterRating(filters));
  }

  return results;
};

export const toString = (filters) =>
  Object.entries(filters).reduce((acc, [k, v]) => {
    const formatter = {
      text: () => '',
      category: (value) => value.name,
      ages: ([min, max]) => `${min} - ${max} months`,
      timing: (value) => `${value} minutes`,
      rating: ({ ratings }) => `${ratings} stars`,
    }[k];
    return formatter && formatter(v) ? `${acc} ${formatter(v)}` : acc;
  }, filters.text || '');

export const isFilterActive = (filters) =>
  !Object.values(filters).every(
    (value) =>
      (isObject(value) && isEmpty(value)) || (!isObject(value) && isNil(value)),
  );
