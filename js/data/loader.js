import adaptServerData from './adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `Marty McFly JS`;
const APP_ID = 12122018;

const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300
};

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => response.json();

export default class Loader {

  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    const responseData = await toJSON(response);
    return adaptServerData(responseData);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    const responseStatus = await checkStatus(response);
    const responseData = await toJSON(responseStatus);
    return responseData;
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
    const responseStatus = await checkStatus(response);
    return responseStatus;
  }
}
