import React from 'react';
import axios from 'axios';
import {defaultPostCall} from './AxioController';

    function EmailLogin(email,password){
        //console.log(email,password);
        var url = 'login';
        var body = {'username':email,'password':password};
        //console.log('EmailLogin: '+url+' '+body);
        return defaultPostCall(url,body);
    }

    function Register(UserEmail,UserPassword,UserType,FirstName,LastName){
        var url = 'users/register';
        var body = {email: UserEmail,
                    password: UserPassword,
                    user_type:UserType,
                    firstname:FirstName,
                    lastname: LastName
                   }
       return defaultPostCall(url,body);            
    }
    
    
    function ForgotPassword(UserEmail){
        console.log('on right path');
        var url = 'users/forgot-password';
        var body = {email: UserEmail}
       return defaultPostCall(url,body);            
    }



const LoginService = {
  EmailLogin,Register,ForgotPassword //, update, delete, etc. ...
}


export default LoginService;
// (response)=>{

// }


        