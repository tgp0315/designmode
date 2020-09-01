// 工厂模式
// 简单工厂模式
function bookShop(name, year, vs) {
  var book = {};
  book.name = name;
  book.year = year;
  book.vs = vs;
  book.price = "暂无定价";
  if (name === "js高级编程") {
    book.price = "79";
  }
  if (name === "css世界") {
    book.price = "69";
  }
  if (name === "VUE权限指南") {
    book.price = "89";
  }
  return book;
}
var book1 = bookShop("js高级编程", "2013", "第三版");
var book2 = bookShop("es6入门教程", "2017", "第六版");
var book3 = bookShop("css世界", "2015", "第一版");
// console.log(book1);
// console.log(book2);
// console.log(book3);
// 工厂方法模式
function Programme () {
  this.books = ['css世界', 'JS高级编程', 'ES6入门教程'];
  var text = '这里有';
  this.books.forEach(function (name) {
    text += name + ' '
  })
  this.content = text
}
function Science () {
  this.books = ['人与自然', '大自然的奥秘', '走进科学']
  var text = '这里有';
  this.books.forEach(function (name) {
    text += name + ' '
  })
  this.content = text 
}
function Society () {
  this.books = ['精神小伙修炼手册', '摇花手', '豆豆鞋']
  var text = '这里有';
  this.books.forEach(function (name) {
    text += name + ' '
  })
  this.content = text 
}

function bookShop (name) {
  var book = new Object()
  book.name = name
  if (name === 'Programme') {
    return new Programme()
  }
  if (name === 'Science') {
    return new Science()
  }
  if (name === 'Society') {
    return new Society()
  }
}

console.log(bookShop('Programme')) 

// JS设计模式之工厂方法模式
function factory(role){
  if(this instanceof factory){
    var a = new this[role]();
    return a;
  }else{
    return new factory(role);
  }
}

factory.prototype={
  superAdmin:function(){
    this.name="超级管理员";
    this.viewPage=["首页","发现页","通讯录","应用数据","权限管理"];
  },
  admin:function(){
    this.name="管理员";
    this.viewPage=["首页","发现页","通讯录","应用数据"];
  },
  user:function(){
    this.name="普通用户";
    this.viewPage=["首页","发现页","通讯录"];
  }
}

let superAdmin = factory("superAdmin");
console.log(superAdmin);
let admin = factory("admin");
console.log(admin);
let user = factory("user");
console.log(user);
// 抽象工厂模式
let agency = function(subType, superType) {
  if (typeof agency[superType] === "function") {
    function F(){};
    F.prototype = new agency[superType]();
    console.log(F.prototype);
    subType.constructor = subType;
    subType.prototype = new F();
  } else {
    throw new Error("抽象类不存在");
  }
}
// 鼠标抽象类
agency.mouseShop = function() {
  this.type = "鼠标";
}
agency.mouseShop.prototype = {
  getName: function(name) {
    return this.name;
  }
}
// 键盘抽象类
agency.keyboardShop = function() {
  this.type = "键盘";
}
agency.keyboardShop.prototype = {
  getName: function(name) {
    return this.name;
  }
}
// 普通鼠标子类
function mouse(name) {
  this.name = name;
  this.item = "买我，我线长，玩游戏贼溜"
}
agency(mouse, "mouseShop");
//普通键盘子类
function keyboard(name) {
  this.name = "键盘";
  this.item = "行，你买他吧，没键盘看你咋玩";
}
agency(keyboard, "keyboardShop");
// 实例化鼠标
let mouseA = new mouse("华为");
console.log(mouseA.getName(), mouseA.type, mouseA.item);
//实例化键盘
let KeyboardA = new Keyboard('联想');
console.log(KeyboardA.getName(), KeyboardA.type,KeyboardA.item); //联想 键盘