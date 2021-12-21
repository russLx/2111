class Cart{
    constructor(){
        this.getCartGoods();
        // this.checkAll();
        //给tbody绑定点击事件
        this._$('#J_cartListBody table').addEventListener('click',this.clickBubbleFn.bind(this))
    }
    /****判断操作的节点****/
    clickBubbleFn (event) {
        let tar = event.target;
        // console.log(event.target.classList.contains('check-one'));
        // 1 判断是否为check-one 
        tar.classList.contains('check-one') && this.oneCheckFn(tar);
    
        // 2 判断点击的是否为类 add(加号按钮)
        tar.classList.contains('add') && this.addClickFn(tar);
    
        // 3判断点击的是否为阐述
        tar.classList.contains('delete') && this.delClickFn(tar);
    
      }
      /******获取购物车数据*****/
  async getCartGoods () {
    // 1 取出local数据
    let cartGoods = localStorage.getItem('cart');
    // 没有数据则停止
    if (!cartGoods) return;
    cartGoods = JSON.parse(cartGoods)
    // console.log(cartGoods);
    

    // 2 发送ajax获取商品数据
    let goodsData = await axios.get({ url: 'js/goods.json' });
    // console.log(goodsData);
    
    //3 循环商品信息,根据id取购物车中的值,有值说明商品在购物车
    let existsCartGoods = goodsData.filter(item => {
      // console.log(item);
      // console.log(cartGoods[item.id]);
      // 结果为数字 转化为 true  undefined 转化为false
      return cartGoods[item.product_id];
    });
    console.log(existsCartGoods,999);

    // console.log(existsCartGoods);
    this.render(existsCartGoods, cartGoods)
  }
  /****渲染购物车列表******/
  render (goodsData, cg) {
    console.log(goodsData,555);
    let template = '';
    // console.log(goodsData, 1111);
    // 1 循环购物车商品
    goodsData.forEach(ele => {
      // console.log(ele);

      template += `<tr>
      <td class="checkbox">
        <input class="check-one check" type="checkbox" />
      </td>
      <td class="goods">
        <img src="${ele.image}" alt="" />
        <span>${ele.name}</span>
      </td>
      <td class="price">${ele.price}</td>
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
    //获取节点的方法
    _$(ele){
      return document.querySelector(ele)
    }
    $$(ele){
      return document.querySelectorAll(ele)
    }
}
new Cart()