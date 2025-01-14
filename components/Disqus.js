import BLOG from '@/blog.config'
import { useState, useCallback, useEffect } from 'react'
import { DiscussionEmbed } from 'disqus-react'

const Disqus = ({ url, id, title }) => {
  const [afterTransition, forceUpdate] = useState(false)
  const transitionEnd = useCallback(ev => {
    const { propertyName } = ev
    if (propertyName === 'color') {
      forceUpdate(o => !o)
    }
  }, [])

  useEffect(() => {
    const Comment = document.getElementById('comment')
    if (Comment) {
      Comment.addEventListener('transitionend', transitionEnd)
    }
    return () => {
      const Comment = document.getElementById('comment')
      if (Comment) {
        Comment.removeEventListener('transitionend', transitionEnd)
      }
    }
  }, [transitionEnd])
  return (
    <DiscussionEmbed
      shortname={BLOG.COMMENT_DISQUS_SHORTNAME}
      config={{
        url: url,
        identifier: id,
        title: title,
        language: BLOG.LANG
      }}
      updateDarkMode={afterTransition}
    />
  )
}
export default Disqus
