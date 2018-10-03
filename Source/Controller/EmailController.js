var EmailController = {
    UserRegistration : async(UserEmail,UserPassword,UserType,FirstName,LastName) =>{
           try{
               var url = 'http://18.191.97.114/api/users/register';
               var body = JSON.stringify({email: UserEmail,
                                           password: UserPassword,
                                           user_type:UserType,
                                           firstname:FirstName,
                                           lastname: LastName
                          });      
               var response = await fetch(url, { method: 'POST',
                                                 headers: {
                                                   'Accept': 'application/json',
                                                   'Content-Type': 'application/json',
                                                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzNjQ0N2RlYjZmMmFiZTMxM2RiYWQ3YTdkYjA0MjU0Yzc2ODE4M2U2Mjg1NDAwNmIwZmUzZGJkYmExMTY4NmM3YzI2MzZlNGE3Y2EzODJiIn0.eyJhdWQiOiIyIiwianRpIjoiYzM2NDQ3ZGViNmYyYWJlMzEzZGJhZDdhN2RiMDQyNTRjNzY4MTgzZTYyODU0MDA2YjBmZTNkYmRiYTExNjg2YzdjMjYzNmU0YTdjYTM4MmIiLCJpYXQiOjE1MzcxOTg4OTQsIm5iZiI6MTUzNzE5ODg5NCwiZXhwIjoxNTY4NzM0ODk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.hE6TIuhzcTxl1hZG0QuXiou3-ZQvsJvmK0xIdBWktMbdzshuhOkyyedIiP3MtaMEtIavvWu-OIsedL3VnSxk6zO55D1AqD6YIirw2Ttk2ERAPWSqF7VlnseMXXwsHOWl3EXY8nPlKCyrSOqym9kV6bDliwzUaYJ7B7UCwsQfKlVNATNNqvk3vIWN3OZq0zKRKhcI5HcIQCNbrWq-lf7v5QzSsFJU-29wWrHVU89hDPwbxj0MKoLXlhvz2bpYhx9ecGKqDHbxKC7VzrtsD2RUuqbBew_EMXdcHl14gFwY3EbENDHDgyOSI2d0OlHtkvAZrSWYlx-TYDxevDnhXi_LLwRqccd-zqUFCV2Tz-vE1ZALtaff1XWatC5SGPmVPlCkbPcNJKdjzu_YCIjOmZzin0PHtlI8yNnBBA7jgEYrtjM1Vj1iZfkTw6fXcDh0yivkvqZ477OIBXQNO6-5wDZxOROvjfcLTh9J7Vs_VfkRzf2ATHoXJangAck-PZb7UWbZIq16TDYZUGEniNqRhconVqrfDr3JdnDHWKnxu73_LRLNZfnYPEX9UdTX2Do83UENQewVH7BJt9LNV_Q_GMhxALmbJi1Ei8V228GhZx39Hmsmxb9p57SCbC51nhwJWjWyq-drd2S6y8dqd7LF1xxN9OZ51UC6oysDDiImYgzebR4'
                                                 },
                                                 body: body
               });
               var responseJson = await response.json();
               console.log(JSON.stringify(responseJson));
                                              
           }catch(e){
               console.log(e);
               return e;
           }
           return responseJson;         
     },

     UserLogin : async(UserEmail,UserPassword) =>{
           try{
               var url = 'http://18.191.97.114/api/login';
               var body = JSON.stringify({username: UserEmail,
                                           password: UserPassword,
                                         });  
               console.log(body);                              
               var response = await fetch(url, { method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzNjQ0N2RlYjZmMmFiZTMxM2RiYWQ3YTdkYjA0MjU0Yzc2ODE4M2U2Mjg1NDAwNmIwZmUzZGJkYmExMTY4NmM3YzI2MzZlNGE3Y2EzODJiIn0.eyJhdWQiOiIyIiwianRpIjoiYzM2NDQ3ZGViNmYyYWJlMzEzZGJhZDdhN2RiMDQyNTRjNzY4MTgzZTYyODU0MDA2YjBmZTNkYmRiYTExNjg2YzdjMjYzNmU0YTdjYTM4MmIiLCJpYXQiOjE1MzcxOTg4OTQsIm5iZiI6MTUzNzE5ODg5NCwiZXhwIjoxNTY4NzM0ODk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.hE6TIuhzcTxl1hZG0QuXiou3-ZQvsJvmK0xIdBWktMbdzshuhOkyyedIiP3MtaMEtIavvWu-OIsedL3VnSxk6zO55D1AqD6YIirw2Ttk2ERAPWSqF7VlnseMXXwsHOWl3EXY8nPlKCyrSOqym9kV6bDliwzUaYJ7B7UCwsQfKlVNATNNqvk3vIWN3OZq0zKRKhcI5HcIQCNbrWq-lf7v5QzSsFJU-29wWrHVU89hDPwbxj0MKoLXlhvz2bpYhx9ecGKqDHbxKC7VzrtsD2RUuqbBew_EMXdcHl14gFwY3EbENDHDgyOSI2d0OlHtkvAZrSWYlx-TYDxevDnhXi_LLwRqccd-zqUFCV2Tz-vE1ZALtaff1XWatC5SGPmVPlCkbPcNJKdjzu_YCIjOmZzin0PHtlI8yNnBBA7jgEYrtjM1Vj1iZfkTw6fXcDh0yivkvqZ477OIBXQNO6-5wDZxOROvjfcLTh9J7Vs_VfkRzf2ATHoXJangAck-PZb7UWbZIq16TDYZUGEniNqRhconVqrfDr3JdnDHWKnxu73_LRLNZfnYPEX9UdTX2Do83UENQewVH7BJt9LNV_Q_GMhxALmbJi1Ei8V228GhZx39Hmsmxb9p57SCbC51nhwJWjWyq-drd2S6y8dqd7LF1xxN9OZ51UC6oysDDiImYgzebR4'
                                            },
                                                 body: body
               });
               var responseJson = await response.json();
               console.log(JSON.stringify(responseJson));

           }catch(e){
               console.log(e);
               return e;
           }
           return responseJson;
     },

    ForgotPassword: async (UserEmail) => {
        try {
            var url = 'http://18.191.97.114/api/users/forgot-password';
            var body = JSON.stringify({ email: UserEmail });
            console.log(body);
            var response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzNjQ0N2RlYjZmMmFiZTMxM2RiYWQ3YTdkYjA0MjU0Yzc2ODE4M2U2Mjg1NDAwNmIwZmUzZGJkYmExMTY4NmM3YzI2MzZlNGE3Y2EzODJiIn0.eyJhdWQiOiIyIiwianRpIjoiYzM2NDQ3ZGViNmYyYWJlMzEzZGJhZDdhN2RiMDQyNTRjNzY4MTgzZTYyODU0MDA2YjBmZTNkYmRiYTExNjg2YzdjMjYzNmU0YTdjYTM4MmIiLCJpYXQiOjE1MzcxOTg4OTQsIm5iZiI6MTUzNzE5ODg5NCwiZXhwIjoxNTY4NzM0ODk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.hE6TIuhzcTxl1hZG0QuXiou3-ZQvsJvmK0xIdBWktMbdzshuhOkyyedIiP3MtaMEtIavvWu-OIsedL3VnSxk6zO55D1AqD6YIirw2Ttk2ERAPWSqF7VlnseMXXwsHOWl3EXY8nPlKCyrSOqym9kV6bDliwzUaYJ7B7UCwsQfKlVNATNNqvk3vIWN3OZq0zKRKhcI5HcIQCNbrWq-lf7v5QzSsFJU-29wWrHVU89hDPwbxj0MKoLXlhvz2bpYhx9ecGKqDHbxKC7VzrtsD2RUuqbBew_EMXdcHl14gFwY3EbENDHDgyOSI2d0OlHtkvAZrSWYlx-TYDxevDnhXi_LLwRqccd-zqUFCV2Tz-vE1ZALtaff1XWatC5SGPmVPlCkbPcNJKdjzu_YCIjOmZzin0PHtlI8yNnBBA7jgEYrtjM1Vj1iZfkTw6fXcDh0yivkvqZ477OIBXQNO6-5wDZxOROvjfcLTh9J7Vs_VfkRzf2ATHoXJangAck-PZb7UWbZIq16TDYZUGEniNqRhconVqrfDr3JdnDHWKnxu73_LRLNZfnYPEX9UdTX2Do83UENQewVH7BJt9LNV_Q_GMhxALmbJi1Ei8V228GhZx39Hmsmxb9p57SCbC51nhwJWjWyq-drd2S6y8dqd7LF1xxN9OZ51UC6oysDDiImYgzebR4'
                },
                body: body
            });
            var responseJson = await response.json();
            console.log(JSON.stringify(responseJson));


        } catch (e) {
            console.log(e);
            return e;
        }
        return responseJson;
    },
     
    ResendEmail: async (UserEmail) => {
        try {
            var url = 'https://www.time2staff.in.net/api/users/send-verification-mail';
            var body = JSON.stringify({ email: UserEmail });
            console.log(body);
            var response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzNjQ0N2RlYjZmMmFiZTMxM2RiYWQ3YTdkYjA0MjU0Yzc2ODE4M2U2Mjg1NDAwNmIwZmUzZGJkYmExMTY4NmM3YzI2MzZlNGE3Y2EzODJiIn0.eyJhdWQiOiIyIiwianRpIjoiYzM2NDQ3ZGViNmYyYWJlMzEzZGJhZDdhN2RiMDQyNTRjNzY4MTgzZTYyODU0MDA2YjBmZTNkYmRiYTExNjg2YzdjMjYzNmU0YTdjYTM4MmIiLCJpYXQiOjE1MzcxOTg4OTQsIm5iZiI6MTUzNzE5ODg5NCwiZXhwIjoxNTY4NzM0ODk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.hE6TIuhzcTxl1hZG0QuXiou3-ZQvsJvmK0xIdBWktMbdzshuhOkyyedIiP3MtaMEtIavvWu-OIsedL3VnSxk6zO55D1AqD6YIirw2Ttk2ERAPWSqF7VlnseMXXwsHOWl3EXY8nPlKCyrSOqym9kV6bDliwzUaYJ7B7UCwsQfKlVNATNNqvk3vIWN3OZq0zKRKhcI5HcIQCNbrWq-lf7v5QzSsFJU-29wWrHVU89hDPwbxj0MKoLXlhvz2bpYhx9ecGKqDHbxKC7VzrtsD2RUuqbBew_EMXdcHl14gFwY3EbENDHDgyOSI2d0OlHtkvAZrSWYlx-TYDxevDnhXi_LLwRqccd-zqUFCV2Tz-vE1ZALtaff1XWatC5SGPmVPlCkbPcNJKdjzu_YCIjOmZzin0PHtlI8yNnBBA7jgEYrtjM1Vj1iZfkTw6fXcDh0yivkvqZ477OIBXQNO6-5wDZxOROvjfcLTh9J7Vs_VfkRzf2ATHoXJangAck-PZb7UWbZIq16TDYZUGEniNqRhconVqrfDr3JdnDHWKnxu73_LRLNZfnYPEX9UdTX2Do83UENQewVH7BJt9LNV_Q_GMhxALmbJi1Ei8V228GhZx39Hmsmxb9p57SCbC51nhwJWjWyq-drd2S6y8dqd7LF1xxN9OZ51UC6oysDDiImYgzebR4'
                },
                body: body
            });
            var responseJson = await response.json();
            console.log(JSON.stringify(responseJson));

        } catch (e) {
            console.log(e);
            return e;
        }
        return responseJson;
    }
 }

    export {EmailController as default}; 