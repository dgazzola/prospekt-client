import Axios from 'axios';
import devLog from '../util/devLog';

const API_URL = process.env.NEXT_PUBLIC_BASE_API;
console.log('api url:', API_URL);

class ApiRequest {
  public baseUrl = `${API_URL}`;
  public baseRoute = '';
  private headers: { [key: string]: string };

  constructor(token?: string, route = '') {
    this.headers = {};
    this.baseRoute = route;
    console.log('constructor route:', route);

    if (token) {
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  private async makeRequest(
    requestType: 'get' | 'post' | 'put' | 'delete',
    path: string = '',
    data?: any
  ) {
    try {
      const url = `${this.baseUrl}${this.baseRoute}${path}`;
      let response;

      if (requestType === 'get') {
        response = await Axios.get(url, { headers: this.headers });
      } else if (requestType === 'post') {
        response = await Axios.post(url, data, { headers: this.headers });
      } else if (requestType === 'put') {
        response = await Axios.put(url, data, { headers: this.headers });
      } else if (requestType === 'delete') {
        response = await Axios.delete(url, { headers: this.headers, data });
      }

      devLog(
        `${this.constructor.name} ${requestType}`,
        response?.status,
        response?.data
      );
      return response;
    } catch (error: any) {
      devLog(`${this.constructor.name} ${requestType} Error`, error);
      throw new Error(error.response.data);
    }
  }

  async get({ path = '' }: { path?: string } = {}) {
    return this.makeRequest('get', path);
  }

  async post({ path = '', data }: { path?: string; data: any }) {
    return this.makeRequest('post', path, data);
  }

  async put({ path = '', data }: { path?: string; data: any }) {
    return this.makeRequest('put', path, data);
  }

  async delete_({ path = '', data }: { path?: string; data?: any }) {
    return this.makeRequest('delete', path, data);
  }
}

export class ProfileRequest extends ApiRequest {
  constructor() {
    super('/profiles');
  }

  async create(data: any) {
    const response = await this.post({ data });
    return response;
  }

  async read() {
    console.log('frontend read api call');
    const response = await this.get(); // No need to pass '/profiles' here
    return response;
  }
}
