import { useEffect, useState } from 'react'; 

const Clock = () => {

    const [ date, setDate ] = useState(); 

    function refreshClock () 
    {
        setDate(new Date()); 
    }

    useEffect(() => 
    {
        const timer = setInterval(refreshClock, 1000); 
        return function cleanup()
        {
            clearInterval(timer); 
        }
    }, [])

    return ( 
        <div className="clock"> 
        {date.toLocaleTimeString()}  
        </div>
     );
}
 
export default Clock;