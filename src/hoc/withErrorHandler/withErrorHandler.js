import React, {useState, useEffect} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxlary/Axulary'

const withErrorHandler = (WrappedComponent, axios) => {
  return  props => {
    const[error, setError] = useState(null)


      const requestInterceptor = axios.interceptors.request.use(null, request => {
        setError(null);
        return request;
      })
      const responseInterceptor = axios.interceptors.response.use(res => res, error =>{
       setError(error);
      });

    const  errrorConfirmedHandler = () =>{
      setError(null);
    }

    useEffect(() =>{
      return() => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.request.eject(responseInterceptor);
      }
    }, [requestInterceptor, responseInterceptor])

        return (
            <Aux>
              <Modal
                show = {error}
                modalClosed = {errrorConfirmedHandler}>
                {error ? error.message : null}
              </Modal>
              <WrappedComponent {...props}/>
            </Aux>
          );
      }

  }


export default withErrorHandler;