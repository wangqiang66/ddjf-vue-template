/**
 * function: api
 * author  : wq
 * update  : 2018/9/5 9:29
 */
import request from './request'
import xml2json from 'xmlstring2json'
const baseUrlApi = 'https://api.ithome.com'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const api = {
  getSlides: () => request.get('/xml/slide/slide.xml', null, {
    baseURL: baseUrlApi
  }).then(data => {
    if (!data) {
      return []
    }
    const parsedSlides = xml2json(data).rss.channel.item
    return parsedSlides.filter(
      slide => slide.opentype['#text'] === '1'
    ).map(slide => {
      const title = slide.title['#text']
      const image = slide.image['#text']
      const link = slide.link['#text']
      return {
        title,
        image,
        link: `/pages/news/detail?id=${link}&title=${title}`
      }
    })
  }),
  getNewsList: (r) => request.get('/json/newslist/news', null, {
    baseURL: baseUrlApi
  }).then(data => {
    if (!data) {
      return []
    }
    return data.newslist.map(item => ({
      id: item.newsid,
      title: item.title,
      postdate: formatTime(item.postdate),
      commentcount: item.commentcount,
      lapinid: item.lapinid,
      image: item.image,
      link: `/pages/news/detail?id=${item.newsid}&title=${item.title}`
    }))
  })
}

export default api
