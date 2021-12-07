import { useRef, useEffect } from 'react'

type Types = {
  fetchNextPage: () => void,
  isLoading: boolean,
  hasNextPage: boolean | undefined,
  className: 'posts' | 'open-notifications' | 'open-chats' | string,
  byWindow?: boolean,
  reverse?: boolean
}

const InfiniteScroll: React.FC <Types> = ({ fetchNextPage, isLoading, hasNextPage, children, className, byWindow, reverse }) => {
  const ref = useRef<HTMLDivElement>(null)

  const isBottom = ({ current }: React.RefObject<HTMLDivElement>) => {
    if (!current) return false
    const { scrollHeight, scrollTop, clientHeight } = current

    const client = current.getBoundingClientRect().bottom <= window.innerHeight + 30
    const div = scrollHeight - scrollTop === clientHeight
    const reverse = scrollTop <= 40

    if (reverse && !byWindow) return reverse
    return byWindow ? client : div
  }  

  useEffect(() => {
    const onScroll = () => {
      const shouldFetch = !isLoading && hasNextPage && isBottom(ref)
      if (shouldFetch) fetchNextPage()
    }

    const container = byWindow ? document : document.getElementsByClassName(className)[0]

    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [fetchNextPage, isLoading, hasNextPage, className, byWindow])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

export default InfiniteScroll

// import { useRef, useEffect } from 'react'

// type Types = {
//   fetchNextPage: () => void,
//   isLoading: boolean,
//   hasNextPage: boolean | undefined,
//   className: 'posts' | 'open-notifications' | 'open-chats'
// }

// const isBottom = ({ current }: React.RefObject<HTMLDivElement>) => {
//   if (!current) return false
//   return current.getBoundingClientRect().bottom <= window.innerHeight
// }

// const InfiniteScroll: React.FC <Types> = ({ fetchNextPage, isLoading, hasNextPage, children, className }) => {
//   const ref = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const onScroll = () => {
//       const shouldFetch = !isLoading && hasNextPage && isBottom(ref)
//       if (shouldFetch) fetchNextPage()
//     }

//     document.addEventListener('scroll', onScroll)
//     return () => document.removeEventListener('scroll', onScroll)
//   }, [fetchNextPage, isLoading, hasNextPage])

//   return (
//     <div className={className} ref={ref}>
//       {children}
//     </div>
//   )
// }

// export default InfiniteScroll
