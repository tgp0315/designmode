// 装饰者模式
// 装饰者提供比继承更有弹性的替代方案。装饰者用于包装同接口的对象，不仅允许你向方法添加行为，而且还可以将方法设置成原始对象调用(例如装饰者的构造函数)
// 装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰着前面或者后面加上自己的行为以达到特定的目地
// 需要装饰的类
function Macbook() {
  this.cost = function() {
    return 1000;
  };
}
function Memory(macbook) {
  this.cost = function() {
    return macbook.cost() + 75;
  };
}
function BlurayDrive(macbook) {
  this.cost = function() {
    return macbook.cost() + 300;
  };
}
function Insurance(macbook) {
  this.cost = function() {
    return macbook.cost() + 250;
  };
}

var myMackbook = new Insurance(new BlurayDrive(new Memory(new Macbook)));
// console.log(myMackbook.cost());

// 当我们在装饰者对象上调用performTask时，它不仅具有一些装饰者的行为，同时也调用了下层对象的performTask函数。
function ConcreteClass() {
  this.performTask = function() {
    this.preTask();
    console.log("doing something");
    this.postTask();
  }
}
function AbstractDecorator(decorated) {
  this.performTask = function() {
    decorated.performTask();
  }
}
function ConcreteDecoratorClass(decorated) {
  this.base = AbstractDecorator;
  this.base(decorated);
  decorated.preTask = function() {
    console.log("pre-calling..");
  };
  decorated.postTask = function() {
    console.log("post-calling..");
  }
}
var concrete = new ConcreteClass();
var decorator1 = new ConcreteDecoratorClass(concrete);
var decorator2 = new ConcreteDecoratorClass(decorator1);
console.log(decorator1.performTask());