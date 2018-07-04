import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAZeroData() {
  return request('/stock/history_kline?code=US.BILI&start=2018-04-01&end=2018-04-02&ktype=K_1M&nsukey=nK6nxeo6NlZYOE2SHv2YDJhIa%2BsbnfiGLVNqpHDbfdaJQ%2BY8%2BVQOeyFK4%2FGH6ar%2Bb0tP%2FL%2F%2BhYpcUhQeghyoJ5n7dVbDYJlYbL5NVy2zO9vPME1g4pw9dGyL5Dpoqf7kQbZZchQWLxNP0NB6dAvnM0jgDJUkoMcsD9066VHBJiveXNvbmSxlAGpzAXW4AhYJchMCbGW5lGfl2mhYc4qpsA%3D%3D');
}

export async function queryAZeroStreamData() {
  return request('/stock/cur_kline_stream?code=US.IQ&ktype=K_1M');
}
