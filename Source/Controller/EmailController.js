var EmailController = {
    UserRegistration : async(UserEmail,UserPassword,UserRole) =>{
            // const { UserName }  = this.state ;
           //console.log('ddgwdkydou',UserEmail+' '+UserPassword+' '+UserRole);
           try{
               var url = 'http://time2staff.com/AppAPI/config/userRegistrationAPI.php';
               var body = JSON.stringify({email: UserEmail,
                                           password: UserPassword,
                                           role:UserRole
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