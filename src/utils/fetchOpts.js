import moment from 'moment/moment';

export const itemsOpts = {
  persist: true,
  cachePolicy: 'cache-and-network',
  interceptors: {
    response: async ({ response }) => {
      const res = response;
      if (res.data && Array.isArray(res))
        res.forEach((item) => {
          item.quantity = parseInt(item.quantity, 10);

          if (item.added_timestamp) {
            item.addedAt = moment(item.added_timestamp);
            delete item.added_timestamp;
          }
          if (item.expiry_timestamp) {
            item.expiresAt = moment(item.expiry_timestamp);
            delete item.expiry_timestamp;
          }
          if (item.addedAt && item.expiresAt) {
            item.duration = moment.duration(item.expiresAt.diff(item.addedAt));
          }
        });
      return res;
    },
  },
};
