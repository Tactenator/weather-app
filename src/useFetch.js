import { useState, useEffect } from 'react';

const useFetch = (props) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
     
    useEffect(() => {
        const abortCont = new AbortController();

        fetch(props, { signal: abortCont.signal})
          .then(res => {
            if(!res.ok)
            {   
                throw error('Could not load resources')
            }
            return res.json();
          })
          .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
          })
          .catch(err => {
            setIsPending(false);
            setError(err.message);
          })

          return () => {
              console.log('fetch aborted');
              abortCont.abort();
          }
      }, [props]);

      return { data, isPending, error };
}

export default useFetch; 