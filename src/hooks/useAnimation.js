import { useEffect, useState } from 'react'

export function useAnimation(delay = 0) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return show
}

export function useFadeIn(delay = 0) {
  const show = useAnimation(delay)
  return show ? 'animate-fade-in' : 'opacity-0'
}

export function useSlideUp(delay = 0) {
  const show = useAnimation(delay)
  return show ? 'animate-slide-up' : 'opacity-0 translate-y-4'
}

export function useScaleIn(delay = 0) {
  const show = useAnimation(delay)
  return show ? 'animate-scale-in' : 'opacity-0 scale-95'
}
