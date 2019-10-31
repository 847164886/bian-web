import {
  USER_INFO,
  USER_ADDRESS_CREATE,
} from './url';

/**
 * 获取用户信息
 * @param $axios
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export async function Info ($axios, params) {
  return $axios.$get(USER_INFO, { params: params });
}

/**
 * 添加用户地址
 * @param $axios
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export async function AddressCreate ($axios, params) {
  return $axios.$post(USER_ADDRESS_CREATE, params);
}
