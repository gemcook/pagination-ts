import {fruitsRepository} from '../repository';

const getPagination = async (query: object) => {
  return await fruitsRepository.getPagination(query);
};

export const fruitsService = {
  getPagination,
};
