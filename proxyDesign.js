// 代理模式
// 代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。
// 代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。
// 示例
// 先声明美女对象
var girl = function (name) {
  this.name = name;
};
// 这是dudu
var dudu = function (girl) {
  this.girl = girl;
  this.sengGift = function (gift) {
    alert(`Hi ${girl.name},dudu送你一个礼物：${gift}`);
  }
};
// 大叔代理
var proxyTom = function (girl) {
  this.girl = girl;
  this.sengGift = function (gift) {
    (new dudu(girl).sengGift(gift));
  }
};

var proxy = new proxyTom(new girl("酸奶小妹"));
proxy.sengGift("999朵玫瑰花");


// 明星与助理
var Ad = function (price) {
  this.price = price;
};
Ad.prototype.getPrice = function () {
  return this.price;
};
// 定义助理对象
var assistant = {
  init: function(ad) {
    var money = ad.getPrice();
    if (money > 300) {
      this.receiveAd(money);
    } else {
      this.rejectAd();
    }
  },
  receiveAd: function (price) {
    StaticRange.receiveAd();
  },
  rejectAd: function () {
    star.rejectAd();
  }
};
// 定义明星对象
var star = {
  receiveAd: function(price) {
    console.log("广告费" + price + "万元");
  },
  rejectAd: function() {
    console.log("拒绝小制作！");
  }
}

assistant.init(new Ad(5));//拒接小制作！
assistant.init(new Ad(500));