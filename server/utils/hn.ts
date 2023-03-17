// import { topicMap } from '~/share/hn'
// console.log('====> topicMap :', topicMap)

const baseURL = 'https://hacker-news.firebaseio.com/v0'

const topicUrlMap = {
  ask: 'askstories',
  jobs: 'jobstories',
  show: 'showstories',
  newest: 'newstories',
  news: 'topstories',
}

const cacheMap = {}

const getItem = async (id, withComments = false) => {
  const key = `${id}-${withComments}`
  if (cacheMap[key])
    return cacheMap[key]

  // console.log('====> doFetch for :', id)
  const item = await $fetch(`${baseURL}/item/${id}.json`)
  item.kids = item.kids || {}
  cacheMap[key] = {
    ..._.pick(item, ['id', 'score', 'time', 'url', 'type', 'title', 'by']),
    content: item.text,
    commentsCount: Object.values(item.kids).length,
    // comments: withComments
    //   ? await Promise.all(
    //     Object.values(item.kids as string[]).map(id =>
    //       fetchItem(id, withComments)
    //     )
    //   )
    //   : []
  }

  return cacheMap[key]
}

const getItems = async ({ page = '1', topic = 'news', limit = 10 }) => {
  limit = Number(limit)
  const start = (Number(page) - 1) * limit
  const end = start + limit

  let itemIds = await $fetch(`${baseURL}/${topicUrlMap[topic]}.json`)
  itemIds = itemIds.slice(start, end)

  return Promise.all(itemIds.map(getItem))
}

export const hn = {
  getItem,
  getItems,
}
