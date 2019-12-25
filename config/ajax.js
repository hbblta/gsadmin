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
  post(urlData,data) {
    let url = 'https://api.zjdandaotech.com/'+urlData
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        method: 'post',
        data: qs.stringify(data)
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
  }
}
