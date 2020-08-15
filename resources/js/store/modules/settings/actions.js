import settingService from './../../../services/setting.service.js';
import router from './../../../helpers/router.js';
export default {
    fetchStripe({ commit, dispatch }) {
      settingService.fetchStripeSetting()
               .then(stripeSettings => {
                  commit('GET_STRIPE', stripeSettings);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });

    },

    saveStripe({ commit }, stripe) {
      settingService.saveSetting(stripe)
               .then(stripeSettings => {
                  commit('SET_STRIPE', stripeSettings);

                  //router.push('/settings');
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    updateStripe({ commit }, stripe) {
      settingService.updateSetting(stripe)
               .then(todo => {
                  commit('UPDATE_STRIPE', stripe);
                  router.push('/settings/stripe');
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },
  };
