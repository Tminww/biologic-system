const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

export const isIsoDateString = (value: string) => isoPattern.test(value)

export const formatDateTime = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return String(value)
  }
  const pad = (part: number) => String(part).padStart(2, '0')
  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${day}.${month}.${year} ${hours}:${minutes}`
}
