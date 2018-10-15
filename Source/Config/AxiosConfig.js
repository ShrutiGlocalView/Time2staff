import axios from 'axios';

var Axios = axios.create({baseUrl:'https://time2staffdev.azurewebsites.net/backend/public/api/',
                            timeout: 10000,
                            headers: {'Accept': 'application/json'}
                          });

export default Axios;