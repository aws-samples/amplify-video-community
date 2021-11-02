import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } =
        window && window.innerWidth && window.innerHeight
            ? window
            : { innerWidth: 0, innerHeight: 0 }
    return {
        width,
        height,
    }
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 1920, // To trick SSR which does not have window object
        height: 1080, // To trick SSR which does not have window object
    })

    useEffect(() => {
        setWindowDimensions(getWindowDimensions())

        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}
