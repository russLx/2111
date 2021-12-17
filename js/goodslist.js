class Goods {
    constructor() {
      // 获取节点
      this.cont = document.querySelector('.row')
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
        html += `            <div data-v-29f30695="" class="span10 product-cell shadow">
        <div data-v-29f30695="" class="figure"><a data-v-29f30695="" href="#none"
                data-log_code="311915pcchannellist_two_type4001005#t=product&amp;act=other&amp;page=channel&amp;page_id=1915&amp;bid=3870706.1&amp;pid=13649"
                target="_blank" class="exposure" data-settrack="true"
                onclick="_msq.push(['trackEvent','','/','&quot;&quot;']);"><img
                    data-v-29f30695=""
                    data-src="${goods.image}"
                    src="${goods.image}"
                    lazy="loaded" style="background-color: rgb(245, 245, 245);"></a></div>
        <h3 data-v-29f30695="" class="title"><a data-v-29f30695="" href="//www.mi.com/buy?product_id=13649"
                data-log_code="311915pcchannellist_two_type4001005#t=product&amp;act=other&amp;page=channel&amp;page_id=1915&amp;bid=3870706.1&amp;pid=13649"
                target="_blank" class="exposure" data-settrack="true"
                onclick="_msq.push(['trackEvent','311915pcchannellist_two_type4001005#t=product&amp;act=other&amp;page=channel&amp;page_id=1915&amp;bid=3870706.1&amp;pid=13649','//www.mi.com/buy?product_id=13649','&quot;&quot;']);">${goods.name}</a></h3>
        <p data-v-29f30695="" class="desc">${goods.desc}</p>
        <!---->
        <p data-v-29f30695="" class="price"><strong data-v-29f30695="">${goods.price}</strong>元<span
                data-v-29f30695="">起</span><del data-v-29f30695="">${goods.del}</del></p>
    </div>`;
      });
  
      // console.log(html);
      this.cont.innerHTML = html;
    }
  }
  
  new Goods;