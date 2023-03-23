import _dayjs from 'dayjs'

export const dayjs = _dayjs
export function host(url: string) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace('?id=', '/')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www')
    parts.shift()
  return parts.join('.')
}

export const getNowString = () => _dayjs().format('YYYY-MM-DD HH:mm:ss')
