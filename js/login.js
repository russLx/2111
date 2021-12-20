//登录的手机号正则验证
let tel = document.querySelector('#username');
let des = document.querySelector('.sp1');
let pwd = document.querySelector('#pwd');
let dess = document.querySelector('.sp2');
console.log(tel,pwd);
//手机号正则
let telReg=/^1[3-9]\d{9}$/;
//邮箱号正则
// let mailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
//绑定手机号 邮箱号，失去焦点的时候进行正则验证
tel.onblur=()=>{
    if(telReg.test(tel.value)){
        des.innerHTML = '√'
        des.className = 'sy3'
    }else{
        des.innerHTML = '手机号格式不正确'
        des.className = 'sy2'
    }
    // if(mailReg.test(tel.value)){
    //     des.innerHTML = '√'
    //     des.className = 'sy3'
    // }else{
    //     des.innerHTML = '邮箱号格式不正确'
    //     des.className = 'sy2'
    // }
}
//密码正则
let pwdReg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
//绑定密码
pwd.onblur=()=>{
    if(pwdReg.test(pwd.value)){
        dess.innerHTML = '√'
        dess.className = 'sy3'
    }else{
        dess.innerHTML = '密码至少包含 数字和英文，长度6-20'
        dess.className = 'sy2'
    }
}