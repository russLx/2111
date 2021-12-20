//获取节点
let username = document.querySelector('#username');
let des = document.querySelector('.sp1');
let pwd = document.querySelector('#pwd');
let dess = document.querySelector('.sp2');
let pwds = document.querySelector('#pwds');
let desss = document.querySelector('.sp3');
let zc = document.querySelector('.txt2');
console.log(username,pwd,zc);
//手机号正则
let usernameReg=/^1[3-9]\d{9}$/;

//绑定手机号 邮箱号，失去焦点的时候进行正则验证
username.onblur=()=>{
    if(usernameReg.test(username.value)){
        des.innerHTML = '√'
        des.className = 'sy3'
    }else{
        des.innerHTML = '手机号格式不正确'
        des.className = 'sy2'
    }

}
//密码正则
let pwdReg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
//输入密码
pwd.onblur=()=>{
    
    if(pwdReg.test(pwd.value)){
        dess.innerHTML = '√'
        dess.className = 'sy3'
    }else{
        dess.innerHTML = '6-20 位，字母、数字、字符'
        dess.className = 'sy2'
    }
}
//确认密码
pwds.onblur=()=>{
    //如果密码与确认密码的值想同且不为空
    if(pwd.value==pwds.value&&pwd.value!=''){
        desss.innerHTML = '√'
        desss.className = 'sy3'
    }else if(pwds.value==''){
        desss.innerHTML = '请输入确认的密码'
        desss.className = 'sy2'
    }
    else{
        desss.innerHTML = '密码不一致'
        desss.className = 'sy2'
    }

}

//注册点击事件 
zc.onclick=()=>{
let data=`username=${username.value}&password=${pwd.value}`
console.log(data);
//发送ajax 
axios.post('http://localhost:3000/name',data)
  .then(function (response) {
    console.log(response);
    location.href='http://127.0.0.1:5500/2111/login.html'
  })
  .catch(function (error) {
    console.log(error);
  });

}