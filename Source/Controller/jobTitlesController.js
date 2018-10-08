var jobTitlesController = {
  job_titles: async() => { 
    var url = 'https://time2staffdev.azurewebsites.net/backend/public/api/job_titles';
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
        console.log('error '+e);
          return e;
      }
      return responseJson; 
                                               
  }
}

export {jobTitlesController as default};