export default function cutText(text) {
  const arr = text.split(' ')
  if (arr.length > 30) {
    return `${arr.slice(0, 30).join(' ')}...`
  }
  if (!text) {
    return 'No overview yet.'
  }
  return text
}
