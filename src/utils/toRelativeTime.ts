const toRelativeTime = (date: string | Date, shorthand?: boolean): string => {
  const seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000)

  let interval = seconds / 31536000;

  if (interval > 1) {
    const time = Math.floor(interval)
    const s = time === 1 ? '' : 's'

    if (shorthand) return `${time}y`
    return `${time} year${s} ago`
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    const time = Math.floor(interval)
    const s = time === 1 ? '' : 's'

    if (shorthand) return `${time}mo`
    return `${time} month${s} ago`
  }

  interval = seconds / 86400;
  if (interval > 1) {
    const time = Math.floor(interval)
    const s = time === 1 ? '' : 's'

    if (shorthand) return `${time}d`
    return `${time} day${s} ago`
  }

  interval = seconds / 3600;
  if (interval > 1) {
    const time = Math.floor(interval)
    const s = time === 1 ? '' : 's'

    if (shorthand) return `${time}h`
    return `${time} hour${s} ago`
  }

  interval = seconds / 60;
  if (interval > 1) {
    const time = Math.floor(interval)
    const s = time === 1 ? '' : 's'

    if (shorthand) return `${time}m`
    return `${time} minute${s} ago`
  }
  
  return 'Now'
}

export default toRelativeTime