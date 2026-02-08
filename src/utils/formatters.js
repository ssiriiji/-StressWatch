export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDateTime = (timestamp) => {
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`
}

export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} นาที`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours} ชม. ${mins} นาที` : `${hours} ชั่วโมง`
}

export const formatNumber = (num, decimals = 0) => {
  return num.toFixed(decimals)
}

export const formatPercentage = (value, max = 100) => {
  return `${Math.round((value / max) * 100)}%`
}
