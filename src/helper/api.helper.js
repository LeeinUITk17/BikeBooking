const axios = require("axios");

const BASE_URL = `http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v`;

module.exports = {
    getGoldValue: async () => {
        try {
            const response = await axios({
                method: "GET",
                url: BASE_URL,
                headers: {
                    "content-type": "application/json"
                }
            });

            const goldData = response.data;
            return goldData;
        } catch (error) {
            console.error('Error fetching gold data:', error);
            throw error;
        }
    }
};
