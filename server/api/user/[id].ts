export default defineEventHandler(async (event) => {
  return hn.getUser(event.context.params.id)
})
