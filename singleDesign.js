// 单例模式
// 最简单的单例
var mySingleleton = {
  property1:  "something",
  property2: "something else",
  method1: function() {
    console.log("hello world");
  }
}
// 添加私有方法
var mySingleleton1 = function() {
  // 这里声明私有变量和方法
  var privateVariable = "something private";
  function showPrivate() {
    console.log(privateVariable);
  }
  // 公有变量和方法 可以访问私有变量和方法
  return {
    publicMethod: function() {
      showPrivate();
    },
    publicVar: "the public can see this!"
  };
};
var single = mySingleleton1();
// console.log(single);
single.publicMethod();
// console.log(single.publicVar);
// 实例一次，使用构造函数
var Singleton = (function() {
  var instantiated;
  function init() {
    // 这里定义单例代码
    return {
      publicMethod: function() {
        console.log("hello world");
      },
      publicProperty: "test"
    }
  }
  return {
    getInstance: function() {
      if(!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  }
})();
// 调用公有的方法来获取实例
Singleton.getInstance().publicMethod()
// 单例用在什么样的场景比较好呢？其实单例一般是用在系统间各种模式的通信协调上
var SingletonTester = (function() {
  //参数：传递给单例的一个参数集合
  function Singleton(args) {
    // 设置args变量为接受的参数或者为空
    var args = args || {};
    // 设置name
    this.name = "SingletonTester";
    //设置pointX的值
    this.pointX = args.pointX || 6;
    // 设置pointY的值
    this.pointY = args.pointY || 10;
  }
  // 实例容器
  var instance;
  var _static = {
    name: "SingletonTester",
    // 获取实例的方法
    // 返回Singleton的实例
    getInstance: function(args) {
      if(instance === undefined) {
        instance = new Singleton(args);
      }
      return instance;
    }
  }
  return _static;
})();
var singletonTest = SingletonTester.getInstance({ pointX: 5});
console.log(singletonTest.pointX);
