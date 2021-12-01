import type { RefObject } from 'react'
import { useEffect } from 'react'

const useOutsideClick = (ref: RefObject<HTMLDivElement>, exception: string, action: () => void) => {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const el = ref?.current
      const { target } = e

      if (!el || !target) return

      if (el.contains(e.target as Node)) return
      if ((target as HTMLElement).closest(exception)) return
      
      action()
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  }, [ref, action, exception])
}

export default useOutsideClick