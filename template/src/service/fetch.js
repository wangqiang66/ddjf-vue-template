/**
 * function: fetch
 * author  : wq
 * update  : 2018/7/30 10:23
 */

import fetch from 'fetch-ie8'
const basePath = (() => {
  const location = document.location
  const pathname = location.pathname
  const proName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1)
  return location.protocol + '//' + location.host + proName
})()

const isObject = function (param) {
  return typeof param === 'object'
}

class newFetch {
  defaults = {
    baseURL: '',
    method: 'post',
    cache: 'no-cache', // no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
    headers: {
      'content-type': 'application/json'
    },
    timeout: 30000,
    auth: {},
    withCredentials: false,
    responseType: 'json',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxRedirects: 5,
    type: 'ajax' // ajax, file
  }
  constructor () {
    this.init()
  }
  init () {
    this.baseURL = basePath
    this.addTimeout()
  }
  // 处理fetch兼容，如果window没有fetch 则用fetch-ie8来兼容
  addTimeout () {
    this.fetchAddTimeout(window.fetch)
  }
  // fetch 增加超时
  fetchAddTimeout (fetch) {
    const oldFetch = fetch
    const newFetch = (url, opts) => {
      const timeout = parseInt(opts.timeout) || this.defaults.timeout
      return Promise.race([oldFetch(url, opts), new Promise(function (resolve, reject) {
        setTimeout(() => {
          reject({
            code: '-001',
            msg: 'fetch timeout'
          })
        }, timeout)
      })])
    }
    this.fetch = (url, opts) => {
      return this.dealParams(newFetch, url, opts).then(response => {
        return response.json()
      })
    }
  }
  // 增加进度 对于type为file的文件上传或者下载增加进度
  addProgress (func) {
    return function (response) {
      const reader = response.body.getReader()
      let bytesReceived = 0
      reader.read().then(function processResult (result) {
        if (result.done) {
          return false
        }
        bytesReceived += result.value.length

        return reader.read().then(processResult)
      })
    }
  }
  // 处理参数
  dealParams (newFetch, _url, _opts) {
    if (isObject(_url)) {
      _opts = _url
      _url = _opts.url
    }
    const method = _opts.method || this.defaults.method
    const cache = _opts.cache || this.defaults.cache
    const credentials = _opts.credentials || _opts.withCredentials ? 'include' : this.defaults.credentials
    const mode = _opts.mode || this.defaults.mode
    const redirect = _opts.redirect || this.defaults.redirect
    const referrer = _opts.referrer || this.defaults.referrer
    const headers = _opts.headers || this.defaults.headers
    const options = {
      method,
      mode,
      cache,
      redirect,
      credentials,
      referrer,
      headers
    }
    if (/(?:post|put|delete)/i.test(method)) {
      if (typeof _opts.data === 'object') {
        options.body = JSON.stringify(_opts.data)
      } else {
        options.body = _opts.data
      }
    }
    if (_opts.type === 'file') {
      return newFetch(this.dealUrl(_url, _opts.baseURL || this.defaults.baseURL), options).then((response) => {
        this.addProgress(_opts.progress)(response)
      })
    } else {
      return newFetch(this.dealUrl(_url, _opts.baseURL || this.defaults.baseURL), options)
    }
  }
  // 处理请求url设置
  dealUrl (url, baseUrl) {
    if (/^(?:http|ftp|file|tcp|assets)s?:\/\//.test(url)) {
      return url
    } else {
      return baseUrl + url
    }
  }
}

export default new newFetch().fetch
