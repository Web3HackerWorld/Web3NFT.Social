export default defineEventHandler(async (event) => {
  configureSWRHeaders(event)
  const { page, topic } = getQuery(event)
  return hn.getItems({ page, topic })
})
