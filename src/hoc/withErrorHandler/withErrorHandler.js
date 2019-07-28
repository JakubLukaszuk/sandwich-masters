import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxlary/Axulary'

const withErrorHandler = (WrappedComponent, axios) => {
  return  class extends Component {
    state = {
        error: null,
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(null, request => {
        this.setState({error: null})
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error =>{
        this.setState({error: error})
      });
    }

    errrorConfirmedHandler = () =>{
      this.setState({error: null})
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

      render(){
        return (
            <Aux>
              <Modal
                show = {this.state.error}
                modalClosed = {this.errrorConfirmedHandler}>
                {this.state.error ? this.state.error.message : null}
              </Modal>
              <WrappedComponent {...this.props}/>
            </Aux>
          );
      }

  }
}

export default withErrorHandler;