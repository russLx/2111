//获取节点
let username = document.querySelector('#username');
let pwd = document.querySelector('#pwd');
let zc = document.querySelector('.txt2');
console.log(username,pwd,zc);
//注册点击事件 
zc.onclick=()=>{
let data=`username=${username.value}&password=${pwd.value}`
console.log(data);

axios.post('http://localhost:3000/name',data)
  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });

}