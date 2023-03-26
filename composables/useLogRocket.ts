export function useLogRocket() {
  const firstVisitTime = getLsItem('logRocket-firstVisitTime', getNowString())

  const doIdentify = (address) => {
    if (typeof LogRocket === 'undefined' || !LogRocket.identify)
      return

    LogRocket.identify(address, {
      loginTime: getNowString(),
      firstVisitTime,
    })
  }

  return { doIdentify }
}
