import { useEffect, useState } from "react"
import Header from "./Header"
import SmallScreenHeader from "./smallScreenHeader"

const ResponsiveHeader = () => {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <>
            {width>=850 ? <Header/>: <SmallScreenHeader/>}
        </>
    )
  }

  export default ResponsiveHeader;
  