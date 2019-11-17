import {useState, useEffect} from 'react';

export default httpClient => {
    const[error, setError] = useState(null)


      const requestInterceptor = httpClient.interceptors.request.use(null, request => {
        setError(null);
        return request;
      })
      const responseInterceptor = httpClient.interceptors.response.use(res => res, error =>{
       setError(error);
      });


    useEffect(() =>{
      return() => {
        httpClient.interceptors.request.eject(requestInterceptor);
        httpClient.interceptors.request.eject(responseInterceptor);
      }
    }, [requestInterceptor, responseInterceptor]);

    const  errrorConfirmedHandler = () =>{
        setError(null);
      }

    return[error, errrorConfirmedHandler];
}