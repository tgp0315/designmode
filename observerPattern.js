// 观察者模式
//观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
// 使用观察者模式的好处：
// 支持简单的广播通信，自动通知所有已经订阅过的对象。
// 页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
// 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。
// 定义一个发布者
var publisher = {
  subscribers: {
    any: [] //event type:subscribers
  },
  subscribe: function (fn, type) {
    type = type || "any";
    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }
  },
  unsubscribe: function (fn, type) {
    this.visitSubscribers("unsubscribe", fn, type);
  },
  publish: function (publication, type) {
    this.visitSubscribers("puublish", publication, type);
  },
  visitSubscribers: function (action, arg, type) {
    var pubtype = type || "any",
      subscribers = this.subscribers[pubtype],
      i,
      max = subscribers.length;
    for (let i = 0; i < max; i++) {
      if (action === "publish") {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
}
//定义一个函数makePublisher()，它接受一个对象作为对象，通过把上述通用发布者的方法复制到该对象中，从而将其转换为一个发布者
function makePublisher(o) {
  var i;
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
      o[i] = publisher[i];
    }
  }
  o.subscribers = { any: [] };
}
//实现paper对象
var paper = {
  daily: function () {
    this.publish("big news today");
  },
  monthly: function () {
    this.publish("interesting analysis", "monthly");
  }
};
//将paper构造成一个发布者
makePublisher(paper);
//已经有了一个发布者。看看订阅对象joe，该对象有两个方法：
var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read' + paper);
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this' + monthly);
  }
};
//paper注册joe（即joe向paper订阅）
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');
//即joe为默认“any”事件提供了一个可被调用的方法，而另一个可被调用的方法则用于当“monthly”类型的事件发生时的情况。现在让我们来触发一些事件：
paper.daily();      //Just readbig news today
paper.daily();      //Just readbig news today
paper.monthly();    //About to fall asleep reading thisinteresting analysis
paper.monthly();    //About to fall asleep reading thisinteresting analysis
paper.monthly();