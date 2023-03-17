export default defineEventHandler(async (event) => {
  configureSWRHeaders(event)
  const { id } = getQuery(event)
  return hn.getItem(id, true)
})
