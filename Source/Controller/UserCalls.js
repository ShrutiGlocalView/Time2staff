var UserCalls = {
    
    getStaffDetails: async (id) => {
        var url = 'https://time2staffdev.azurewebsites.net/backend/public/api/staff/' + id;
        try {
            var response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlMzg2NjE0ZWMwNzU1YjIyNGQyZGNlMGI0MmM2YTQ0MmM0NTIwMDRhMmZiMGMxNWVjOTQwOTQ3ZjVkNTdlYTQwYmE1NTE5YjBlYjBhNmNkIn0.eyJhdWQiOiIyIiwianRpIjoiM2UzODY2MTRlYzA3NTViMjI0ZDJkY2UwYjQyYzZhNDQyYzQ1MjAwNGEyZmIwYzE1ZWM5NDA5NDdmNWQ1N2VhNDBiYTU1MTliMGViMGE2Y2QiLCJpYXQiOjE1MzUyODQ3MDksIm5iZiI6MTUzNTI4NDcwOSwiZXhwIjoxNTY2ODIwNzA5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.NIzroV2LRxgk4ugEmaBl8wGjMOymyQXIYR-3P43XyGjXzErGYInRe4fFByhQWvj1Y-yZZjMQHSw6rw-EsjBW2U0oGQS3x9EtnhSm03JpbVn7xG-abgyiE0oYqYtBD0ZOkJu32BqOjmv7XzmK3LjCietT7s7y_DkE3BAqLG9kC9YT6_igAB8aJ006S8WEU_4vyHxRfNjIZ5wz5mGJ2lfSxlRLm1RfVVgBH_NJxBkqCUvJACXQY9zpwg0Coy87R1xGdWTfKdSCeYyIP7C6lYJ53jOjPuQWHWP1Xg7AfwbEq6oW7CwD05R5_-Xa9f6Q-YJv_Aq7IdCqvkoHmRfwkLK-A7AFMkFjthSCUUW8Z7uiRvuQZqsDQ9jzFgikenWOafsUyFYJjhL-VZEuCbPeyHaq-_XxhErb4897wSBab8NLaRmSAb007Z1SkPzNJL2udyry6PwlY75023Ul44Od75KXcURqG-V24_yb5VMkNc29c0z1wyUBqXAqRdEEf6i_IGTIMk7jp3Uc43ekYnBwhAgw3R-6X3P661FesCEa5QZ0vUqzNphTesktdYGNZe1dtKEDgIAEzbM7VrhcSjSg0qMrkLxrZyHsb26k3rzyhj9TJbFuQdS-ymSOF1k9XjuoHhRjJx4V0iIZE8HRVNBASJEz51OUTisBI8th5_J8BrmI9uM'
                }
            });
            var responseJson = await response.json();
            //    console.log(JSON.stringify(responseJson));
        } catch (e) {
            return e;
        }
        return responseJson;
    },

    getClientDetails: async (id) => {
        var url = 'https://time2staffdev.azurewebsites.net/backend/public/api/business/' + id;
        try {
            var response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlMzg2NjE0ZWMwNzU1YjIyNGQyZGNlMGI0MmM2YTQ0MmM0NTIwMDRhMmZiMGMxNWVjOTQwOTQ3ZjVkNTdlYTQwYmE1NTE5YjBlYjBhNmNkIn0.eyJhdWQiOiIyIiwianRpIjoiM2UzODY2MTRlYzA3NTViMjI0ZDJkY2UwYjQyYzZhNDQyYzQ1MjAwNGEyZmIwYzE1ZWM5NDA5NDdmNWQ1N2VhNDBiYTU1MTliMGViMGE2Y2QiLCJpYXQiOjE1MzUyODQ3MDksIm5iZiI6MTUzNTI4NDcwOSwiZXhwIjoxNTY2ODIwNzA5LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.NIzroV2LRxgk4ugEmaBl8wGjMOymyQXIYR-3P43XyGjXzErGYInRe4fFByhQWvj1Y-yZZjMQHSw6rw-EsjBW2U0oGQS3x9EtnhSm03JpbVn7xG-abgyiE0oYqYtBD0ZOkJu32BqOjmv7XzmK3LjCietT7s7y_DkE3BAqLG9kC9YT6_igAB8aJ006S8WEU_4vyHxRfNjIZ5wz5mGJ2lfSxlRLm1RfVVgBH_NJxBkqCUvJACXQY9zpwg0Coy87R1xGdWTfKdSCeYyIP7C6lYJ53jOjPuQWHWP1Xg7AfwbEq6oW7CwD05R5_-Xa9f6Q-YJv_Aq7IdCqvkoHmRfwkLK-A7AFMkFjthSCUUW8Z7uiRvuQZqsDQ9jzFgikenWOafsUyFYJjhL-VZEuCbPeyHaq-_XxhErb4897wSBab8NLaRmSAb007Z1SkPzNJL2udyry6PwlY75023Ul44Od75KXcURqG-V24_yb5VMkNc29c0z1wyUBqXAqRdEEf6i_IGTIMk7jp3Uc43ekYnBwhAgw3R-6X3P661FesCEa5QZ0vUqzNphTesktdYGNZe1dtKEDgIAEzbM7VrhcSjSg0qMrkLxrZyHsb26k3rzyhj9TJbFuQdS-ymSOF1k9XjuoHhRjJx4V0iIZE8HRVNBASJEz51OUTisBI8th5_J8BrmI9uM'
                }
            });
            var responseJson = await response.json();
            //    console.log(JSON.stringify(responseJson));
        } catch (e) {
            return e;
        }
        return responseJson;
    },
}

export default UserCalls;