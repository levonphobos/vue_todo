const settingService = {
    fetchStripeSetting,
    saveSetting,
  };

export default settingService;

function fetchStripeSetting() {
  return new Promise((resolve, reject) => {
        Vue.axios.get('/api/settings/stripe')
             .then(response => {
                resolve(response.data);
              })
             .catch(error => {
                reject(error);
              });

      });
};

function saveSetting(stripe) {
  return new Promise((resolve, reject) => {
        const setting = {
          type: 'stripe',
          setting: stripe,
        };
        Vue.axios.post('/api/settings', setting)
             .then(response => {
                console.log(response);
                resolve(response.data);
              })
             .catch(error => {
                reject(error);
              });

      });
}
