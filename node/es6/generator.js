//execute with --harmony

//===============
//
//1.yield will suspend the functio
//2.next() will trigger function exection and suspend on yield
//3.next accept an argument as a result of yield
//4. to defind a generator, you should add * after function
//===============

function * fn() {
  var a = 1;
  while (true) {
    a++;
    var item = yield a;
    console.log('item ', item);
  }
}

console.log('fn constructor name is ', fn.constructor.name);

var f = fn();
f.next();
for (var i = 0; i < 10; i++) {
  console.log("next is ", f.next(i).value);
}

function delay(mill, cb) {
  setTimeout(function() {
    cb('slept ' + mill);
  }, mill);
}

function run(generatorFunction) {
  var generatorltr = generatorFunction(resume);

  function resume(callbackValue) {
    console.log("callback value is ", callbackValue);
    generatorltr.next(callbackValue); //trigger the subsequent yields.
  }
  generatorltr.next(); // trigger the first yield.
}

run(function * myDeplayedMessages(resume) {
  console.log(yield delay(1000, resume));
  console.log(yield delay(1200, resume));
});