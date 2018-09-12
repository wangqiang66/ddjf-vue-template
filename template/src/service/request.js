/**
 * function: request
 * author  : wq
 * update  : 2018/9/5 9:30
 */
import wx from './wx'
import Fly from 'flyio'

console.log(Fly)
const request = Fly

request.interceptors.request.use(request => {
  // wx.showNavigationBarLoading()
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    // wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    // wx.hideNavigationBarLoading()
    // wx.showToast({
    //   title: err.message,
    //   icon: 'none'
    // })
    return promise.resolve({
      code: '-001',
      msg: '网络异常，请稍后重试!'
    })
  }
)

export default request
