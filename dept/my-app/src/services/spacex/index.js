import axios from "axios";

class SpaceXAPI {
  baseUrl
  constructor() {
    this.baseUrl = 'https://api.spacexdata.com/v3/';
  }

  getRockets() {
    return axios.get(`${this.baseUrl}rockets`)
  }

  getLaunches() {
    return axios.get(`${this.baseUrl}launches`)
  }
}

export default SpaceXAPI;
