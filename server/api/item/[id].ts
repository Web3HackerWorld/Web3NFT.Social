export default defineEventHandler(async (event) => {
  return hn.getItem(event.context.params.id, true)
})
