class Goods {
  constructor() {
    // 获取节点
    this.cont = document.querySelector('#main>.goods')
    // 调用方法
    this.getGoods();

  }
  async getGoods() {
    // 发送请求,回去json数据
    let data = await axios.get({
      url: './js/goods.json',
      data: ''
    });
    console.log(data, 111);

    // 遍历追加到页面中
    let html = '';
    data.forEach(goods => {
      //console.log(goods);
      // console.log(goods.name);
      html += `<div class="good"><div class="img"><img src="${goods.image}"></div>
            <h3>${goods.name}</h3>
            <p class="name">${goods.desc}</p>
            <p class="price">
                <strong>${goods.price}</strong>
                元起
                <del>${goods.del}</del>
            </p><a href="#none" id="InitCartUrl" class="btn-special1 btn-lg" onclick="Goods.addCart(${goods.product_id},1)">加入购物车</a></div>
           
            `
    });

    // console.log(html);
    this.cont.innerHTML = html;
  }
  //加入购物车的方法
  static addCart(id, num) {
    // console.log(id, num);
    //1 取出local中的值
    let cartGoods = localStorage.getItem('cart');
    // console.log(cartGoods);
    //2判断是否有值
    if (cartGoods) { // 3-1 有值
      //3-2 解析数据
      cartGoods = JSON.parse(cartGoods);
      // 3-3 判断商品是否购买,当前添加的id,是否已经存在于购物车中
      for (let attr in cartGoods) {
        // 3-4 存在则修改数量
        attr == id && (num = num + cartGoods[attr]);
      }
      console.log(id, num);
      // 3-5 存在则修改数量,不存在则添加
      cartGoods[id] = num;
      localStorage.setItem('cart', JSON.stringify(cartGoods))


    } else { //没有数据
      cartGoods = {
        [id]: num
      };
      localStorage.setItem('cart', JSON.stringify(cartGoods))
    }
  }
}

new Goods;