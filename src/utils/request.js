import axios from "axios";
import store from "@/store";
import { Modal } from "antd";
import { getToken } from "@/utils/auth";
import { logout } from "@/store/actions";

//Create an AXIOS example
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api of base_url
  timeout: 5000, // request timeout
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      // Let each request carry token - ['Authorization'] for custom keys, please modify according to the actual situation
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => response,
  /**
   * The following comment is to mark the request status by custom Code in response
   * When the code returns the following case, the permissions have problems, log out and return to the login page.
   * If you want to use the XMLHTTPRequest to write the status code logic to be written in Error
   * The following code is sample, please modify it in combination, if you don't need it, you can delete it.
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:Illegal token; 50012: Other clients are logged in; 50014: Token expired;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // Please introduce it yourself MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('You have been logged out, you can cancel the page, or log in again', 'Determine', {
  //         confirmButtonText: 're-register',
  //         cancelButtonText: 'Cancel',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // In order to re-instantiate the Vue-router object to avoid BUG
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  (error) => {
    console.log("err" + error); // for debug
    const { status } = error.response;
    if (status === 403) {
      Modal.confirm({
        title: "Determine?",
        content:
          "Since you have not been operated for a long time, you have been logged out, you can cancel the page, or log in again",
        okText: "re-register",
        cancelText: "Cancel",
        onOk() {
          let token = store.getState().user.token;
          store.dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    return Promise.reject(error);
  }
);

export default service;
