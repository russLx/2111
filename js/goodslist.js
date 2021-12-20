class Goods {
    constructor() {
      // 获取节点
      this.cont = document.querySelector('#main>.goods')
      // 调用方法
      this.getGoods();
  
    }
    async getGoods () {
      // 发送请求,回去json数据
      let data = await axios.get({ url: './js/goods.json', data: '' });
      console.log(data,111);
  
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
            </p></div>`
        });
  
      // console.log(html);
      this.cont.innerHTML = html;
    }
  }
  
  new Goods;