import { basicURLS } from "../../config/Config";

export async function getTenants(accessToken: string) {
  var url = basicURLS.fecthTenantsURL;
  var bearer = 'Bearer ' + accessToken;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearer
    }
  }).then(responseJson => {
    console.log(responseJson);
    return responseJson.json().then(data => {
      console.log(data)
      return data
    });
  })
    .catch(error => {
      console.log(error);
    });
}