var SaveProfile = {
    getDefaults: async () => {
        var url = 'https://time2staffdev.azurewebsites.net/backend/public/api/defaults';
        try {
            var response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            var responseJson = await response.json();
            //    console.log(JSON.stringify(responseJson));
        } catch (e) {
            return e;
        }
        return responseJson;
    },

    personalInfo: (id, bussinessName, business_id, phoneNumber, address1, city, zipcode, state, country_id, timezone_id) => {
        responseTemp = axios({
            method: 'put',
            url: 'https://time2staffdev.azurewebsites.net/backend/public/api/business/' + id,
            params: {
                name: bussinessName,
                business_category_id: business_id,
                contact1: phoneNumber,
                address1: address1,
                city: city,
                zipcode: zipcode,
                state: state,
                country_id: country_id,
                timezone_id: timezone_id
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE2MjM1ODZiYTFmMWZiMDMyZTc2YzRjMTliMmY1MDYzMzllM2I3YTAxZmFlOGU4MDBjNzJkNTM3NDc2MWRhM2FkYjU5NmY2NjQ0MzYxOGU2In0.eyJhdWQiOiIyIiwianRpIjoiMTYyMzU4NmJhMWYxZmIwMzJlNzZjNGMxOWIyZjUwNjMzOWUzYjdhMDFmYWU4ZTgwMGM3MmQ1Mzc0NzYxZGEzYWRiNTk2ZjY2NDQzNjE4ZTYiLCJpYXQiOjE1Mzg1NjU0NjcsIm5iZiI6MTUzODU2NTQ2NywiZXhwIjoxNTcwMTAxNDY3LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.R1jKoDhrAt4syAk2nDd9gfURxEkiAxMr-CLbYuUmH4FPexF0d7DBdIXfXIb5pV87qtJ9Lq0md1uEJMbm5VY7L01rVw3Ghs1yIyhwoORvlhByKfJuXEymZhDv8oJd_ccgRfdf2OCOGP24xDfDJGUVUnuuA_i8Is2E-z9pdzMSi1KBhFadiRw5sNTYQoOOmZ6UrWuuK2mykQ76N-ci6nJhG2wOLSy8-VmyglHxwH10oqNrL0GBzDEEJuNTuK_EapzHH2zx50LVbiGtJUwoNKJ8uWOPffkzFpffM_XBHF61s6XjxOyNGxmq9mEvwU6fK_CgjpqjtQLsJoxPpRyI1ImVm8On8Eh1_HVaUZcPRPWHUiluF6hwyphLG37ogafQQrNO40m1sPAA19cO4D-diPyNm5RVUN3zL-PDBoyDA8Pwjxk7mWmscfU7oTmo6ywHjs02uomA_KqcA01t9AMJP8KpKB8Gog9Lrd9joMzMD5N6O4-JWpuYQSoIILA2B4V5Iq44ZZkZXA0Vy7r2zaNYKlajkSdSWEQtXwQnxJmMF_dFMzpNnOJg2Q4_CGZ6sxuaVPwiMhmQEUUh1sJN2a_jXW0jz6cKdyjh5WPrIdUJk8WBYc5MEN-AHpuzjT9kwR3qgUcgFF8ZK9CJGiME_r0_LR3SXLLPS4QJUbuoCIeq6Ek9uxs',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function (response) {
            console.log("response is: : :");
            console.log(response);
            return response;
        }).catch(function (error) {
            console.log(error.response);
        });
        // console.log('responseTemp');
        // console.log(responseTemp);
        return responseTemp;
    },

    cardDetails: (user_id, cardCVC, cardNumber, month, year) => {
        responseTemp = axios({
            method: 'put',
            url: 'https://time2staffdev.azurewebsites.net/backend/public/api/users/cards/store',
            params: {
                cvc: cardCVC,
                expiration_year: year,
                expiration_month: month,
                card_number: cardNumber,
                user_id: user_id
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2NWM3MjVlMDliMDQyYWM5NjIzYTYzZmI2NWQzN2Y2YzEyZDgzYTEyNmQyMDU1MWZiYjQxMmJlZjFmNDEyY2Q5NTE0ZDJkZTgyMWMxNGY5In0.eyJhdWQiOiIyIiwianRpIjoiYjY1YzcyNWUwOWIwNDJhYzk2MjNhNjNmYjY1ZDM3ZjZjMTJkODNhMTI2ZDIwNTUxZmJiNDEyYmVmMWY0MTJjZDk1MTRkMmRlODIxYzE0ZjkiLCJpYXQiOjE1Mzg5NzU5MDMsIm5iZiI6MTUzODk3NTkwMywiZXhwIjoxNTcwNTExOTAyLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.jIUteu-lzS4UP_eYRO4dMog8-V-Q3lJFSBeADg6dwKUyjMVxNo1n_b5jqSDDoOweEh6nLDsoWL3priJy4e2iqoqdpVBhKOhoIj2hWRDh1prIjBjYNQRUVtr3FXB8EgMtOjLw57-PXxJGI3N2_IXLUGmPOeKE_g_IiSqjbgdefdSAUuP0XuUJUnblTnTZgmjg8JQK__qrG-BijTP1oPPnZ3AA2ZpEsDFbjgPSgg-gdEJ9QIA6zZFn4xdEOrEJrUhwwy9zPd340xCOzAz6VJXzlttHmS33R16XzXzVNXinECLB16w7fmELMfjO7L1SZC_PJlRBe6Ra15VK7yxWLSlTWbqu8sb3Dn2FaCSeD7h6uBwSAKDVt_k4KDQ_eWO2frr8UJY8E0BagSLatDPLktVJvryHxbdlzNxTJPABNPLA8nEHkGOwhjCzryDnQgdEYEALxFQ3DpLbEwPpvSU2YKxkLGw9ki4Jki7WxrPdtlit7JfpmcbmNoqegdcQ43rq2WAJbLZV8KDs5i6jZEYe9jzQ-nTi-W2jbQz0JeVeMsYeIs4WGQzzsg9A-d9tKiVJqBY6pOQeBr1a-7zb1_Boc5g9YFOz-hzXfQbvH89qNvYo3zGOLZ1XnG8Y1mBjBbm5yn1suqZnUoXJvZUz0x6N1oESOJ16Vypgbej0RN1u4lVVZO8',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function (response) {
            console.log("response is: : :");
            console.log(response);
            return response;
        }).catch(function (error) {
            console.log(error.response);
        });
        // console.log('responseTemp');
        // console.log(responseTemp);
        return responseTemp;
    },

}

const axios = require('axios');

export { SaveProfile as default }; 