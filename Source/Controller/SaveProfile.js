//first_name,last_name,gender,born,country_id,bank_account,tax_county,tax_percent,address,zipcode,city,phone,description
var SaveProfile = {
    personalInfo : async(first_name,last_name,gender,born,country_id,bank_account,tax_county,tax_percent,address,zipcode,city,phone,description) =>{
           try{
               var url = 'http://time2staff.com/AppAPI/config/editProfileAPI.php';
               var body = JSON.stringify({first_name: first_name,
                                           last_name: last_name,
                                           gender:gender,
                                           born:born,
                                           country_id:country_id,
                                           bank_account:bank_account,
                                           tax_county:tax_county,
                                           tax_percent:tax_percent,
                                           address:address,
                                           zipcode:zipcode,
                                           city:city,
                                           phone:phone,
                                           description:description,
                                           user_id:'00001',
                                           role:'0'
                          });      
               var response = await fetch(url, { method: 'POST',
                                                 headers: {
                                                   'Accept': 'application/json',
                                                   'Content-Type': 'application/json',
                                                 },
                                                 body: body
               });
               console.log(response);
               var responseJson = await response.json();
               //console.log(JSON.stringify(responseJson));
                                              

           }catch(e){
               console.log(e);
               return e;
           }
           return responseJson; 
                                                    
     },

     getCountries : async() =>{
         var url = 'http://dev.time2staff.com/api/countries';
           try{
                     
               var response = await fetch(url, { method: 'POST',
                                                 headers: {
                                                   'Accept': 'application/json',
                                                   'Content-Type': 'application/json',
                                                 }
               });
               
               var responseJson = await response.json();
               //console.log(JSON.stringify(responseJson));
                                              

           }catch(e){
              
               return e;
           }
           return responseJson; 
                                                    
     }
          
 }

    export {SaveProfile as default}; 