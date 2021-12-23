//轮播图 
//获取元素
var inner = document.querySelector('.carousel-inner');
var pic = inner.children;
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')
var circleBtn = document.querySelector('.carousel-btn')
// var btn = circleBtn.children;
// console.log(inner, pic, prev, next, circleBtn, btn);

function setBtn() {
    //遍历a
    for (var i = 0; i < pic.length; i++) {
        let a = document.createElement('a')
        a.setAttribute('class', 'btn')
        // btn.innerHTML = i + 1;
        circleBtn.appendChild(a);

    }
    //给第一个小圆圈设置背景
    circleBtn.children[0].classList.add('active')
    //把第一张图片复制一张给最后面 表示不仅复制了btn标记，还把它里面的图片复制了
    var first = pic[0].cloneNode(true)
    inner.appendChild(first)
}
setBtn()
//点击按钮切换图片
//问题：当咱们连续点击按钮的时候，事件重复触发了，它是没有进入回调函数的也就是说没有进行条件判断
function picSwitching() {
    //点击按钮切换图片并有动画 circleBtn.children表示所有btn标记
    for (let i = 0; i < circleBtn.children.length; i++) {
        //设置自定义属性
        circleBtn.children[i].setAttribute('index', i)
        //表示div标记下面所有btn标记
        circleBtn.children[i].onclick = function () {
            //获取自定义属性
            var index = this.getAttribute('index')
            //当点击按钮的时候，把下标给到右侧按钮，实现同步操作
            num = index
            circle = index
            //让按钮背景颜色改变，做排他
            for (var j = 0; j < circleBtn.children.length; j++) {
                circleBtn.children[j].className = ''
            }
            this.className = 'active'
            //让图片切换 pic[0]表示ul里面第一个li pic[0].offsetWidth表示第一个li的宽度
            //设置负值，元素才会向左边移动
            /*
            无缝轮播图原理
            + 由于每一张图片大小是一样的，把第一张图片复制一张给拼接到所有图片的最后面
            + 当执行到拼接的这种图片的时候，让程序一瞬间把它拉回到第一张图片，由于第一张图片和最后一张图片
            长得一模一样，可以骗过眼睛
            container.style.width = pic[0].offsetWidth * pic.length
        */
            animation(inner, -pic[0].offsetWidth * index, 'left')
        }
    }
}
picSwitching()
//声明一个变量作为改变的下标
var num = 0
var circle = 0
//点击右侧按钮让图片切换
//使用开关的思路来写
var flag = true
next.onclick = function () {
    if (flag) {
        flag = false
        num++
        //问题：最后一次没有执行动画
        //  console.log(num)
        //当咱们点击自增到最后一张的时候，条件满足进入判断体直接拉回到第一张了，所以下面的动画是没有执行的
        animation(inner, -pic[0].offsetWidth * num, 'left', function () {
            //把判断条件放在回调函数里面，只有每一次动画执行完毕后再执行条件里面的东西
            if (num == pic.length - 1) {
                num = 0
                //一瞬间把它拉回第一张图片
                inner.style.left = 0
            }
            flag = true
        })
        circle++
        if (circle > circleBtn.children.length - 1) {
            circle = 0
        }
        for (var j = 0; j < circleBtn.children.length; j++) {
            circleBtn.children[j].className = ''
        }
        circleBtn.children[circle].className = 'active'
    }
}
//点击左侧按钮进行切换
prev.onclick = function () {
    if (flag) {
        flag = false
        if (num == 0) {
            num = pic.length - 1
            //一瞬间把它拉回第一张图片
            inner.style.left = -pic[0].offsetWidth * num + 'px'
        }
        num--
        animation(inner, -pic[0].offsetWidth * num, 'left', function () {
            flag = true
        })
        circle--
        if (circle < 0) {
            circle = circleBtn.children.length - 1
        }
        for (var j = 0; j < circleBtn.children.length; j++) {
            circleBtn.children[j].className = ''
        }
        circleBtn.children[circle].className = 'active'
    }
}
var timer = null
//自动轮播
function auto() {
    timer = setInterval(function () {
        //怎么调用事件和匿名函数  
        //next.onclick里面保存的就是函数，所以加一个括号就可以直接调用执行
        //让事件自调用，直接加括号就可以
        next.onclick()
    }, 3000)
}
auto()
//当鼠标移入到swiper容器里面的时候让自动轮播停止
inner.parentNode.onmouseover = function () {
    clearInterval(timer)
}
inner.parentNode.onmouseout = function () {
    auto()
}
/*
       倒计时的原理
       + 使用将来的时间 - 现在的时间
       + 时间转换
         => 使用将来的毫秒数 - 现在的毫秒数 = 差值的毫秒数
         => 总的秒数 = 差值的毫秒数/1000
         => 剩余天数 = 总的秒数/3600/24
         => 剩余小时 = 总的秒数/3600%24
         => 剩余分钟 = 总的秒数/60%60
         => 剩余秒数 = 总的秒数%60
       + 问题
         => 设置将来的时间，不会变化
         => 现在的时间要变化的，使用setInterval()
   */
//获取页面的时间节点

var h = document.querySelector('.hour');
var m = document.querySelector('.minute');
var s = document.querySelector('.second');

//    console.log(,h,m,s,555);
//设置将来的时间
var endDate = new Date('2022/01/01 00:00:00');
console.log(endDate);
daojishi()

//使用定时器动态看现在时间
setInterval(daojishi, 1000);

function daojishi() {
    var nowDate = new Date();
    //总秒数 
    var seconds = parseInt((endDate.getTime() - nowDate.getTime()) / 1000);
    //小时
    var hh = complement(parseInt(seconds / 3600 % 24));
    //分钟
    var mm = complement(parseInt(seconds / 60 % 60));
    //秒
    var ss = complement(parseInt(seconds % 60));

    h.innerHTML = hh;
    m.innerHTML = mm;
    s.innerHTML = ss;
}

function complement(num) {
    return num < 10 ? num = '0' + num : num
}
// <!--            购物车的信息-->
class scart {
    constructor() {
        this.getCartGoods();
        this.spnum()
    }
    async getCartGoods() {
        // 1 取出local数据
        let cartGoods = localStorage.getItem('cart');
        // 没有数据则停止
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);


        // 2 发送ajax获取商品数据
        let goodsData = await axios.get({
            url: 'js/goods.json'
        });
        // console.log(goodsData);

        //3 循环商品信息,根据id取购物车中的值,有值说明商品在购物车
        let existsCartGoods = goodsData.filter(item => {
            // console.log(item);
            // console.log(cartGoods[item.id]);
            // 结果为数字 转化为 true  undefined 转化为false
            return cartGoods[item.product_id];
        });
        // console.log(existsCartGoods, 999);

        // console.log(existsCartGoods);
        this.render(existsCartGoods, cartGoods)
    }
    /****渲染购物车列表******/
    render(goodsData, cg) {
        // console.log(goodsData, 555);
        let template = '';
        // console.log(goodsData, 1111);
        // 1 循环购物车商品
        goodsData.forEach(ele => {
            // console.log(ele);

            template += `<tr>
              <td class="goods">
              <img src="${ele.image}" alt="">
             
            </td>

            <td class="price">&emsp;&nbsp;${ele.price}元</td>
            
              
            <td class="count-input" >&emsp;&emsp;${cg[ele.product_id]}件</td>
              
            
            <td class="subtotal">&emsp;&emsp;&emsp;共${ele.price * cg[ele.product_id]}元</td>
            
              
            
          </tr>`
        });

        this._$('.cart-info table').innerHTML = template;

    }
    //总计数量
    spnum() {
        let cartGoods = localStorage.getItem('cart');
        // 没有数据则停止
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);

        let num = 0;
        for (let i in cartGoods) {
            num += cartGoods[i] - 0

        }
        this._$('.cart-bar a').innerHTML = '购物车('+num+')'
    }

    //获取节点的方法
    _$(ele) {
        return document.querySelector(ele)
    }

}
new scart()