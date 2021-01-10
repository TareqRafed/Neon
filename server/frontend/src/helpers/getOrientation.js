import {useEffect, useState} from 'react';

export default function IsPortrait() { // a hook to check which components to show

    const [portrait, setPortrait] = useState(false);
    useEffect(() => {
      function handleResize() {
        setPortrait(window.innerHeight > window.innerWidth ? true : false);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
  
    return portrait;
  }