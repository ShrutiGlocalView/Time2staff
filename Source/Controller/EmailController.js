var EmailController = {
    UserRegistration : async(UserEmail,UserPassword,UserType,FirstName,LastName) =>{
            // const { UserName }  = this.state ;
           //console.log('ddgwdkydou',UserEmail+' '+UserPassword+' '+UserRole);
           try{
               var url = 'http://192.168.0.113/time2staff-ngx-laravel/public/api/users/register';
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
            // const { UserName }  = this.state ;
           console.log('ddgwdkydou',UserEmail+' '+UserPassword);
           try{
               var url = 'http://localhost/time2staff_web/AppAPI/config/loginAPI.php';
               var body = JSON.stringify({email: UserEmail,
                                           password: UserPassword,
                                         });  
               console.log(body);                              
               var response = await fetch(url, { method: 'POST',
                                                 headers: {
                                                   'Accept': 'application/json',
                                                   'Content-Type': 'application/json',
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
                                                    
     }
          
 }

    export {EmailController as default}; 