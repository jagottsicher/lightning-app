import { computed, extendObservable } from 'mobx';
import { toCaps } from '../helper';

const ComputedNotification = store => {
  extendObservable(store, {
    lastNotification: computed(() => {
      const { notifications: nots } = store;
      return nots.length ? nots[nots.length - 1] : null;
    }),
    displayNotification: computed(() => {
      const { lastNotification: last } = store;
      return last ? last.display : false;
    }),
    computedNotifications: computed(() => {
      const { notifications } = store;
      const all = notifications ? notifications.slice() : [];
      all.sort((a, b) => b.date.getTime() - a.date.getTime());
      all.forEach(n => {
        n.typeLabel = toCaps(n.type);
        n.dateLabel = n.date.toLocaleDateString();
        n.dateTimeLabel = n.date.toLocaleString();
      });
      return all;
    }),
  });
};

export default ComputedNotification;
