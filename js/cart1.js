class Cart {
  constructor() {
    this.getCartGoods();
    this.checkAll();
    //给tbody绑定点击事件
    this._$('#J_cartListBody table').addEventListener('click', this.clickBubbleFn.bind(this))
    this.spnum()
  }
  /****判断操作的节点****/
  clickBubbleFn(event) {
    let tar = event.target;
    // console.log(event.target.classList.contains('check-one'));
    // 1 判断是否为check-one 
    tar.classList.contains('check-one') && this.oneCheckFn(tar);

    // 2 判断点击的是否为类 add(加号按钮)
    tar.classList.contains('add') && this.addClickFn(tar);

    // 3 判断点击的是否为类 reduce(减号按钮)
    tar.classList.contains('reduce') && this.randuceClickFn(tar);

    // 4判断点击的是否为阐述
    tar.classList.contains('delete') && this.delClickFn(tar);

  }
  /******获取购物车数据*****/

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

      template += `<tr goods-id="${ele.product_id}">
      <td class="checkbox">
        <input class="check-one check" type="checkbox" />
      </td>
      <td class="goods">
        <img src="${ele.image}" alt="" />
        <span>${ele.name}</span>
      </td>
      <td class="price">${ele.image}</td>
      <td class="count">
        <span class="reduce">-</span>
        <input class="count-input" type="text" value="${cg[ele.product_id]}" />
        <span class="add">+</span>
      </td>
      <td class="subtotal">${ele.price * cg[ele.product_id]}</td>
      <td class="operation">
        <span class="delete">删除</span>
      </td>
    </tr>`
    });

    this._$('#J_cartListBody table').innerHTML = template;

  }
  // **************全选的实现************
  checkAll() {
    //1 给全选按钮绑定事件
    let obj = this._$('.check-all');
    // console.log(obj,222);

    //2 给全选按钮绑定事件，事件回调函数的this指向节点对象，使用bind
    obj.addEventListener('click', this.allClickFn.bind(this));
  }
  //使用bind和event ，bind传递的参数在前面
  allClickFn(event) {
    // console.log(event,555);
    //获取点击全选按钮的状态 
    let status = event.target.checked; //看看点击是true 还是flase
    // console.log(status);
    this.oneChecked(status);
    //统计数量和价格传递全选的状态
    this.subTotal(status);

  }
  //***********单个商品选中 */
  oneChecked(status) {
    console.log(this.$$('.check-one'));
    this.$$('.check-one').forEach(one => {
      one.checked = status;
    })
  }
  /****商品单选框回调函数***/
  oneCheckFn(target) {
    this.subTotal();

    if (!target.checked) {
      this._$('.check-all').checked = false;
      return;
    }

    //*********判断选中商品的数量 */
    let count = 0;
    this.$$('.check-one').forEach(v => {
      v.checked && count++;
    })
    // console.log(count);
    // 选中的数量,等于购物车商品数量,则全选选中
    if (count == this.$$('.check-one').length) {
      this._$('.check-all').checked = true;
    }
  }
  /******统计价格和数量******/
  subTotal(sta = true) {
    // console.log(555);

    //1 总计和数量的变量
    let totalNum = 0,
      totalPrice = 0;
    //2 获取所有的节点，遍历找出选中的
    sta && this.$$('.check-one').forEach(ele => {
      // console.log(ele);
      if (ele.checked) {
        // console.log(ele);
        //找到tr
        let trObj = ele.parentNode.parentNode;
        // console.log(trObj);
        //4 获取小计和数量
        totalNum += (trObj.querySelector('.count-input').value - 0);
        console.log(trObj.querySelector('.count-input').value);
        console.log(trObj.querySelector('.subtotal').innerHTML);
        totalPrice += (trObj.querySelector('.subtotal').innerHTML - 0);
      }
    })
    // 5 放入页面中

    this._$('#J_selTotalNum').innerHTML = totalNum;
    this._$('#J_cartTotalPrice').innerHTML = totalPrice;
  }

  //**********增加数量 */
  addClickFn(target) {
    // console.log(target);
    // 1 获取数量,上一个兄弟节点
    let num = target.previousElementSibling;
    let tr =target.parentNode.parentNode;
    // console.log(num);
    num.value = num.value - 0 + 1;

    // 2 获取小计
    let sub = target.parentNode.nextElementSibling;
    let price = target.parentNode.previousElementSibling.innerHTML;
    //  console.log(sub,price);
    // 算整数

    sub.innerHTML = parseInt((num.value * price) * 100) / 100;
    //  console.log(sub.innerHTML);
    //当input是选中时,统计价格和数量
    target.parentNode.parentNode.querySelector('.check-one').checked && this.subTotal();
    this.spnum()
    this.modifyLocal(tr.getAttribute('goods-id'),num.value)
  }

  //**********减少 */
  randuceClickFn(target) {
    console.log(target);
    // 1 获取数量,下一个兄弟节点
    let tr =target.parentNode.parentNode;
    let num = target.nextElementSibling;
    console.log(num);
    num.value = num.value - 0 - 1;
    num.value==0&&tr.remove();
    // 2 获取小计
    let sub = target.parentNode.nextElementSibling;
    let price = target.parentNode.previousElementSibling.innerHTML;
    //  console.log(sub,price);

    sub.innerHTML = parseInt((num.value * price) * 100) / 100;

    //  console.log(sub.innerHTML);
    //当input是选中时,统计价格和数量
    target.parentNode.parentNode.querySelector('.check-one').checked && this.subTotal();
    this.spnum()
    this.modifyLocal(tr.getAttribute('goods-id'),num.value)
  }
  //*******删除商品 */
  delClickFn(target) {
    let that = this;
    let tr =target.parentNode.parentNode;
    //确认删除框
    layer.open({
      title: '确认删除框',
      content: '确认删除吗？?',
      btn: ['取消', '确认'],
      btn2: function (index, layero) {
        //按钮【按钮二】的回调
        //return false 开启该代码可禁止点击该按钮关闭
        // console.log(target);
        // 删除当前商品节点
        target.parentNode.parentNode.remove();

        // 处于选中状态,则重新计算总价格和数量
        target.parentNode.parentNode.querySelector('.check-one').checked && that.subTotal();

      }
    });
    this.spnum()
    this.modifyLocal(tr.getAttribute('goods-id'))
  }


  //修改数量，num=0 删除
  modifyLocal(id, num = 0) {
    console.log(id,num)
    // 取出local数据
    let cartGoods = localStorage.getItem('cart');
        
    if(!cartGoods) return;
    cartGoods = JSON.parse(cartGoods);
    // 删除对象属性
    console.log(num);
    num == 0 && delete cartGoods[id];
    
    //修改商品数量    
    num != 0 && (cartGoods[id] = num);
    localStorage.setItem('cart',JSON.stringify(cartGoods));
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
    this._$('#J_cartTotalNum').innerHTML = num
  }

  //获取节点的方法
  _$(ele) {
    return document.querySelector(ele)
  }
  $$(ele) {
    return document.querySelectorAll(ele)
  }
}
new Cart()