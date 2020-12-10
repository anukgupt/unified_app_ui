import { basicURLS } from "../../config/Config";

export interface ISubscription {
  subscriptionId: string,
  displayName: string
}

export async function getAllSubscriptions(accessToken: string) {
  var url = basicURLS.fetchSubscriptionsURL;
  return getSubscriptions(url, accessToken).then(subscriptionResponse => {
    var subscriptions: Array<ISubscription> = [];
    subscriptions = subscriptions.concat(subscriptionResponse.value);
    while (subscriptionResponse.nextLink) {
      return getSubscriptions(subscriptionResponse.nextLink, accessToken).then(sub => {
        subscriptions = subscriptions.concat(sub);
        return subscriptions;
      });
    }
    return subscriptions;
  });
}

export async function getSubscriptions(url: string, accessToken: string) {
  var bearer = 'Bearer ' + accessToken;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearer
    }
  }).then(responseJson => {
    return responseJson.json().then(data => {
      return data
    });
  }).catch(error => {
    throw error;
  });
}