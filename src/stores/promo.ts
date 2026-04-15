import { defineStore } from 'pinia';

export const usePromoStore = defineStore('promo', {
  state: () => ({
    promoData: {} as any,
  }),
  actions: {
    setPromoData(data: { }) {
      this.promoData = data;
    },
  },
});