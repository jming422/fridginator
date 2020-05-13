import moment from 'moment/moment';

export const itemsOpts = {
  cachePolicy: 'no-cache',
  interceptors: {
    response: ({ response }) => {
      const res = response;
      if (res.data && Array.isArray(res))
        res.forEach((item) => {
          item.quantity = parseInt(item.quantity, 10);
          if ('added_timestamp' in item) {
            item.addedAt = moment(item.added_timestamp);
            delete item.added_timestamp;
          }
          if ('expiry_timestamp' in item) {
            item.expiresAt = moment(item.expiry_timestamp);
            delete item.expiry_timestamp;
          }
          if ('addedAt' in item && 'expiresAt' in item) {
            item.duration = moment.duration(item.expiresAt.diff(item.addedAt));
          }
        });
      return res;
    },
  },
};
