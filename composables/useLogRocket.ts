export function useLogRocket() {
  const firstVisitTime = getLsItem('logRocket-firstVisitTime', getNowString())

  const doIdentify = (address) => {
    if (!LogRocket || !LogRocket.identify)
      return
    console.log('====> doIdentify.address :', address)
    LogRocket.identify(address, {
      loginTime: getNowString(),
      firstVisitTime,
    })
  }

  return { doIdentify }
}
