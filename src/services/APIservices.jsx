import * as httpRequest from '../utils/httpRequests';

export const getAddress = async (q, depth) => {
  try {
    const res = await httpRequest.get(`/${q}`, {
      params: {
        depth
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
