/**
 * function: mpvue
 * author  : wq
 * update  : 2018/9/12 9:29
 */
module.exports = [
  {
    path: '/views/news/list',
    name: 'NewsList',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/views/news/detail',
    name: 'NewsDetail',
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/views/news/comment',
    name: 'NewsComment',
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: '/views/quanzi/list',
    name: 'QuanziList',
    config: {
      navigationBarTitleText: '圈子',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/views/quanzi/detail',
    name: 'QuanziDetail',
    config: {
      navigationBarTitleText: '圈子详情'
    }
  }
]
