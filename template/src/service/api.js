/**
 * function: api
 * author  : wq
 * update  : 2018/9/5 9:29
 */
import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  if (!request.noLoading) {
    wx.showNavigationBarLoading()
  }
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    if (!response.request.noLoading) {
      wx.hideNavigationBarLoading()
    }
    const data = response.data || {}
    if (data.retCode !== '1') {
      if (!response.request.defineError) {
        wx.showToast({
          title: data.retMsg,
          icon: 'none'
        })
      }
      return promise.reject(data)
    }
    return promise.resolve(data)
  },
  (err, promise) => {
    if (!err.request.noLoading) {
      wx.hideNavigationBarLoading()
    }
    if (!err.request.defineError) {
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    }
    promise.reject()
  }
)

export default request
