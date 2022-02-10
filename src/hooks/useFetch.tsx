import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';



function useFetch() {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [token] = useCookies<any>(['mr-token']);

    useEffect( ()=> {
      async function fetchData() {
        setLoading(true);
        setError(error);
        const data = await API.getMovies(token['mr-token'])
                            .catch( err => setError(err))
        setData(data)
        setLoading(false);
      }
      fetchData();
    }, []);
    return [data, loading, error] as const
}

export {useFetch};