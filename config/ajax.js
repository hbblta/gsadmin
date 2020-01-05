import ajax from 'axios';
export default{
  get(urlDta) {
    let url = 'https://api.zjdandaotech.com/'+urlDta
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'get',
      })
        .then((res) => {
          resolve(res.data);
          // console.log(res);
        })
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  gets(urlDta,token) {
    let url = 'https://api.zjdandaotech.com/'+urlDta
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'get',
        headers : {
          'authorization': token
        },
      })
        .then((res) => {
          resolve(res.data);
          // console.log(res);
        })
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  Delete(urlDta,token) {
    let url = 'https://api.zjdandaotech.com/'+urlDta
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'DELETE',
        headers : {
          'authorization': token
        },
      })
        .then((res) => {
          if(res.data.code == 401){
            localStorage.removeItem('token');
            window.location.reload();
          }
          resolve(res.data);
          // console.log(res);
        })
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  post(urlData,data,token) {
    let url = 'https://api.zjdandaotech.com/'+urlData
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'post',
        headers : {
          'authorization': token
        },
        data: data
      })
        .then((res) => {
          console.log(res.data);
          if(res.data.code == 401){
            localStorage.removeItem('token');
            window.location.reload();
          }
          resolve(res.data);
          // console.log(res);
        })
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  },
  put(urlData,data,token) {
    let url = 'https://api.zjdandaotech.com/'+urlData
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'put',
        headers : {
          'authorization': token
        },
        data: data
      })
        .then((res) => {
          if(res.data.code == 401){
            window.location.reload();
            localStorage.removeItem('token');
          }
          resolve(res.data);
          // console.log(res);
        })
        .catch(function (error) {
          reject(error);
          // console.log(error);
        });
    });
  }
}
