var jobTitlesController = {
  job_titles: async() => { 
    var url = 'http://dev.time2staff.com/api/job_titles';
      try{
                
          var response = await fetch(url, { method: 'POST',
                                            headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json',
                                            }
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

export {jobTitlesController as default};