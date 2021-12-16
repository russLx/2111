//登录的手机号正则验证
let tel = document.querySelector('#username');
let des = document.querySelector('.sp1');
console.log(tel,des);
//手机号正则
let telReg=/^1[3-9]\d{9}$/;
//绑定事件，失去焦点的时候进行正则验证
tel.onblur=()=>{
    if(telReg.test(tel.value)){
        des.innerHTML = '√'
        des.className = 'sy3'
    }else{
        des.innerHTML = '-----手机号格式不正确'
        des.className = 'sy2'
    }
}