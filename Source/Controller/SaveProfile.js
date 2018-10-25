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

    clientPersonalInfo: (id, bussinessName, business_id, phoneNumber, address1, city, zipcode, state, country_id, timezone_id) => {
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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlMzg2NjE0ZWMwNzU1YjIyNGQyZGNlMGI0MmM2YTQ0MmM0NTIwMDRhMmZiMGMxNWVjOTQwOTQ3ZjVkNTdlYTQwYmE1NTE5YjBlYjBhNmNkIn0.eyJhdWQiOiIyIiwianRpIjoiM2UzODY2MTRlYzA3NTViMjI0ZDJkY2UwYjQyYzZhNDQyYzQ1MjAwNGEyZmIwYzE1ZWM5NDA5NDdmNWQ1N2VhNDBiYTU1MTliMGViMGE2Y2QiLCJpYXQiOjE1MzUyODQ3MDksIm5iZiI6MTUzNTI4NDcwOSwiZXhwIjoxNTY2ODIwNzA5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.NIzroV2LRxgk4ugEmaBl8wGjMOymyQXIYR-3P43XyGjXzErGYInRe4fFByhQWvj1Y-yZZjMQHSw6rw-EsjBW2U0oGQS3x9EtnhSm03JpbVn7xG-abgyiE0oYqYtBD0ZOkJu32BqOjmv7XzmK3LjCietT7s7y_DkE3BAqLG9kC9YT6_igAB8aJ006S8WEU_4vyHxRfNjIZ5wz5mGJ2lfSxlRLm1RfVVgBH_NJxBkqCUvJACXQY9zpwg0Coy87R1xGdWTfKdSCeYyIP7C6lYJ53jOjPuQWHWP1Xg7AfwbEq6oW7CwD05R5_-Xa9f6Q-YJv_Aq7IdCqvkoHmRfwkLK-A7AFMkFjthSCUUW8Z7uiRvuQZqsDQ9jzFgikenWOafsUyFYJjhL-VZEuCbPeyHaq-_XxhErb4897wSBab8NLaRmSAb007Z1SkPzNJL2udyry6PwlY75023Ul44Od75KXcURqG-V24_yb5VMkNc29c0z1wyUBqXAqRdEEf6i_IGTIMk7jp3Uc43ekYnBwhAgw3R-6X3P661FesCEa5QZ0vUqzNphTesktdYGNZe1dtKEDgIAEzbM7VrhcSjSg0qMrkLxrZyHsb26k3rzyhj9TJbFuQdS-ymSOF1k9XjuoHhRjJx4V0iIZE8HRVNBASJEz51OUTisBI8th5_J8BrmI9uM',
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

    staffPersonalInfo: (id, firstName, lastName, dob, gender,  phoneNumber, altPhoneNumber,  address1, address2, city, zipcode, state, country_id, timezone_id) => {
        responseTemp = axios({
            method: 'put',
            url: 'https://time2staffdev.azurewebsites.net/backend/public/api/staff/' + id,
            params: {
                firstname: firstName,
                lastname: lastName,
                dob: dob,
                gender: gender,
                contact1: phoneNumber,
                contact2: altPhoneNumber,
                address1: address1,
                address2: address2,
                city: city,
                zipcode: zipcode,
                state: state,
                country_id: country_id,
                timezone_id: timezone_id
                // name: bussinessName,
                // business_category_id: business_id,
                // contact1: phoneNumber,
                // address1: address1,
                // city: city,
                // zipcode: zipcode,
                // state: state,
                // country_id: country_id,
                // timezone_id: timezone_id
            },
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlMzg2NjE0ZWMwNzU1YjIyNGQyZGNlMGI0MmM2YTQ0MmM0NTIwMDRhMmZiMGMxNWVjOTQwOTQ3ZjVkNTdlYTQwYmE1NTE5YjBlYjBhNmNkIn0.eyJhdWQiOiIyIiwianRpIjoiM2UzODY2MTRlYzA3NTViMjI0ZDJkY2UwYjQyYzZhNDQyYzQ1MjAwNGEyZmIwYzE1ZWM5NDA5NDdmNWQ1N2VhNDBiYTU1MTliMGViMGE2Y2QiLCJpYXQiOjE1MzUyODQ3MDksIm5iZiI6MTUzNTI4NDcwOSwiZXhwIjoxNTY2ODIwNzA5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.NIzroV2LRxgk4ugEmaBl8wGjMOymyQXIYR-3P43XyGjXzErGYInRe4fFByhQWvj1Y-yZZjMQHSw6rw-EsjBW2U0oGQS3x9EtnhSm03JpbVn7xG-abgyiE0oYqYtBD0ZOkJu32BqOjmv7XzmK3LjCietT7s7y_DkE3BAqLG9kC9YT6_igAB8aJ006S8WEU_4vyHxRfNjIZ5wz5mGJ2lfSxlRLm1RfVVgBH_NJxBkqCUvJACXQY9zpwg0Coy87R1xGdWTfKdSCeYyIP7C6lYJ53jOjPuQWHWP1Xg7AfwbEq6oW7CwD05R5_-Xa9f6Q-YJv_Aq7IdCqvkoHmRfwkLK-A7AFMkFjthSCUUW8Z7uiRvuQZqsDQ9jzFgikenWOafsUyFYJjhL-VZEuCbPeyHaq-_XxhErb4897wSBab8NLaRmSAb007Z1SkPzNJL2udyry6PwlY75023Ul44Od75KXcURqG-V24_yb5VMkNc29c0z1wyUBqXAqRdEEf6i_IGTIMk7jp3Uc43ekYnBwhAgw3R-6X3P661FesCEa5QZ0vUqzNphTesktdYGNZe1dtKEDgIAEzbM7VrhcSjSg0qMrkLxrZyHsb26k3rzyhj9TJbFuQdS-ymSOF1k9XjuoHhRjJx4V0iIZE8HRVNBASJEz51OUTisBI8th5_J8BrmI9uM',
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