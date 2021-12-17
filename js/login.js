//登录的手机号正则验证
let tel = document.querySelector('#username');
let des = document.querySelector('.sp1');
let pwd = document.querySelector('#pwd');
let dess = document.querySelector('.sp2');
console.log(tel,des);
//手机号正则
let telReg=/^1[3-9]\d{9}$/;
//邮箱号正则
let mailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
//绑定手机号 邮箱号，失去焦点的时候进行正则验证
tel.onblur=()=>{
    if(telReg.test(tel.value)){
        des.innerHTML = '√'
        des.className = 'sy3'
    }else{
        des.innerHTML = '-----手机号格式不正确'
        des.className = 'sy2'
    }
    if(mailReg.test(tel.value)){
        des.innerHTML = '√'
        des.className = 'sy3'
    }else{
        des.innerHTML = '-----邮箱号格式不正确'
        des.className = 'sy2'
    }
}
//绑定密码 验证
pwd.onblur=()=>{
    if(mailReg.test(tel.value)){
        dess.innerHTML = '√'
        dess.className = 'sy3'
    }else{
        dess.innerHTML = '----6-20 位，字母、数字、字符'
        dess.className = 'sy2'
    }
}