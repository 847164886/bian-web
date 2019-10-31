import { APP_DOWNLOAD_URL } from './consts';

/**
 * base64编码
 * @param str
 * @returns {String}
 */
export function base64Encode (str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

/**
 * base64解码
 * @param str
 * @returns {String}
 */
export function base64Decode (str) {
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * 设置cookie认证信息
 * @param auth
 */
export function buildAuth (auth) {
  auth.id = auth.hasOwnProperty('id') ? auth.id : '';
  auth.uuid = auth.hasOwnProperty('uuid') ? auth.uuid : '';
  auth.is_new = auth.hasOwnProperty('is_new') ? auth.is_new : '';
  auth.sex = auth.hasOwnProperty('sex') ? auth.sex : '';
  auth.city = auth.hasOwnProperty('city') ? auth.city : '';
  auth.province = auth.hasOwnProperty('province') ? auth.province : '';
  auth.country = auth.hasOwnProperty('country') ? auth.country : '';
  auth.openid = auth.hasOwnProperty('openid') ? auth.openid : '';
  auth.unionid = auth.hasOwnProperty('unionid') ? auth.unionid : auth.openid;
  auth.mobile = auth.hasOwnProperty('mobile') ? auth.mobile : '';
  auth.nickname = auth.hasOwnProperty('nickname') ? auth.nickname : '';
  auth.headimgurl = auth.hasOwnProperty('headimgurl') ? auth.headimgurl : '';
  auth.profile = auth.hasOwnProperty('profile') ? auth.profile : auth.headimgurl;
  let authorization = {
    wxapp: global.WXAPP,
    user_id: auth.id,
    uuid: auth.uuid,
    is_new: auth.is_new,
    mobile: auth.mobile,
    openid: auth.openid,
    unionid: auth.unionid,
    nickname: auth.nickname,
    profile: auth.profile,
    sex: auth.sex,
    city: auth.city,
    province: auth.province,
    country: auth.country
  };
  return base64Encode(JSON.stringify(authorization));
}

/**
 * 获取请求地址
 * @param req
 * @returns {string}
 */
export function requestUrl (req) {
  if (process.server) {
    let proto = req.header('x-forwarded-proto');
    let host = req.get('host');
    let originalUrl = req.originalUrl;
    proto = proto || 'http';
    return `${proto}://${host}${originalUrl}`;
  } else {
    return window.location;
  }
}

/**
 * 格式化url参数
 * @param queryData
 * @returns {string}
 */
export function httpBuildQuery (queryData) {
  let str = '';
  for (let key in queryData) {
    if (queryData.hasOwnProperty(key)) {
      let value = encodeURIComponent(queryData[key]);
      str = `${str}${key}=${value}&`;
    }
  }
  return str.slice(0, str.length - 1);
}

/**
 * 读取cookie
 * @param name
 * @param thisApp
 * @returns {*}
 */
export function getCookie (name, thisApp) {
  if (process.client) {
    let arr;
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    arr = document.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  } else {
    return thisApp && thisApp.$cookies.get(name);
  }
}

/**
 * 时间格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    let str = o[k] + '';
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
}

/**
 * 把秒转化为时间
 * @param time
 * @returns {{d: number, h: number, m: number, s: number}}
 */
export function timeToDate (time) {
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (time > 0) {
    d = Math.floor(time / (60 * 60 * 24));
    h = Math.floor(time / (60 * 60) - (d * 24));
    m = Math.floor(time / 60) - (d * 24 * 60) - (h * 60);
    s = Math.floor(time) - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);
  }
  if (m <= 9) m = '0' + m;
  if (s <= 9) s = '0' + s;
  return { d: d, h: h, m: m, s: s };
}

/**
 * 跳转app下载地址
 */
export function downloadApp () {
  window.location.href = APP_DOWNLOAD_URL.url;
}

/**
 * 携带xenv
 * @param path
 * @param xenv
 */
export function getPathWithXEnv (path, xenv) {
  base64Decode(xenv);
}

/**
 * 读取ip和xenv
 * @param req
 * @param query
 * @returns {{remoteip: (String|{}), xenv: string}}
 */
export function getXenv (req, query) {
  const remoteip = req.header('X-Forwarded-For') || {};
  const xenv = JSON.stringify({
    puid: query['puid'] ? query['puid'] : '',
    utm_source: query['utm_source'] ? query['utm_source'] : '',
    utm_medium: query['utm_medium'] ? query['utm_medium'] : '',
    utm_campaign: query['utm_campaign'] ? query['utm_campaign'] : '',
    utm_content: query['utm_content'] ? query['utm_content'] : '',
    utm_term: query['utm_term'] ? query['utm_term'] : '',
    utm_key: query['utm_key'] ? query['utm_key'] : ''
  });
  return {
    remoteip: remoteip,
    xenv: xenv
  };
}

/**
 * 阿拉伯数字转换为简写汉字
 * @param Num
 * @returns {string}
 * @constructor
 */
export function turnBigLetter (Num) {
  for (let i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', '');// 替换Num中的“,”
    Num = Num.replace(' ', '');// 替换Num中的空格
  }
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    // alert("请检查小写金额是否正确");
    return;
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(Num).split('.');
  let newchar = '';
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      // alert("位数过大，无法计算");
      return '';
    }// 若数量超过拾亿单位，提示
    let tmpnewchar = '';
    let perchar = part[0].charAt(i);
    switch (perchar) {
      case '0': tmpnewchar = '零' + tmpnewchar; break;
      case '1': tmpnewchar = '一' + tmpnewchar; break;
      case '2': tmpnewchar = '二' + tmpnewchar; break;
      case '3': tmpnewchar = '三' + tmpnewchar; break;
      case '4': tmpnewchar = '四' + tmpnewchar; break;
      case '5': tmpnewchar = '五' + tmpnewchar; break;
      case '6': tmpnewchar = '六' + tmpnewchar; break;
      case '7': tmpnewchar = '七' + tmpnewchar; break;
      case '8': tmpnewchar = '八' + tmpnewchar; break;
      case '9': tmpnewchar = '九' + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
      case 0: tmpnewchar = tmpnewchar + ''; break;
      case 1: if (perchar !== 0) tmpnewchar = tmpnewchar + '十'; break;
      case 2: if (perchar !== 0) tmpnewchar = tmpnewchar + '百'; break;
      case 3: if (perchar !== 0) tmpnewchar = tmpnewchar + '千'; break;
      case 4: tmpnewchar = tmpnewchar + '万'; break;
      case 5: if (perchar !== 0) tmpnewchar = tmpnewchar + '十'; break;
      case 6: if (perchar !== 0) tmpnewchar = tmpnewchar + '百'; break;
      case 7: if (perchar !== 0) tmpnewchar = tmpnewchar + '千'; break;
      case 8: tmpnewchar = tmpnewchar + '亿'; break;
      case 9: tmpnewchar = tmpnewchar + '十'; break;
    }
    newchar = tmpnewchar + newchar;
  }
  // 替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search('零零') !== -1 || newchar.search('零亿') !== -1 || newchar.search('亿万') !== -1 || newchar.search('零万') !== -1) {
    newchar = newchar.replace('零亿', '亿');
    newchar = newchar.replace('亿万', '亿');
    newchar = newchar.replace('零万', '万');
    newchar = newchar.replace('零零', '零');
  }
  // 替换以“一十”开头的，为“十”
  if (newchar.indexOf('一十') === 0) {
    newchar = newchar.substr(1);
  }
  // 替换以“零”结尾的，为“”
  if (newchar.lastIndexOf('零') === newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  return newchar;
}

/**
 * 控制页面固定和可滚动
 * val为true和false
 * true--固定
 * false-滚动
 * @param val
 */
export function pageFixed (val) {
  if (val) {
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.position = 'initial';
    document.documentElement.style.overflow = 'initial';
  }
}

/**
 * 跳转下载或唤起APP
 * 参数信息可参考以下URL
 * http://git.util.ahaschool.com/ahaschool/ahawiki/wikis/app/ahaschool-app-scheme-%E8%B7%B3%E8%BD%AC%E8%A7%84%E5%88%99
 * @param params
 */
export function toApp (params) {
  // 获取url参数中的d和t
  let d = params.d ? parms.d : '';
  let t = params.t ? params.t : '';
  let d2 = params.d2 ? params.d2 : '';
  // 获取设备信息
  if (getCookie('device') === 'wxIos' || getCookie('device') === 'ios') {
    let baseUrl = 'https://gio.ren/u/APVRRB7V/d0B47KV?link_id=d0B47KV&click_id=1213749076&tm_click=1548241139933&custom_params=';
    window.location.replace(baseUrl + encodeURIComponent(`{"d":"${d}","t":"${t}","d2":"${d2}","scheme":"1"}`));
  }
  if (getCookie('device') === 'wxAndroid' || getCookie('device') === 'android' || getCookie('device') === 'web') {
    let baseUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.qinlin.ahaschool&android_schema=';
    window.location.replace(baseUrl + encodeURIComponent(`ahaschool://app?t=${t}&d=${d}&d2=${d2}`));
  }
}
