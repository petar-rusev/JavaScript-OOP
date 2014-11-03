function testFunction(){
    console.log("The number of arguments is "+arguments.length);
    for (var i = 0; i <arguments.length; i++) {
        console.log(arguments[i]+" "+typeof(arguments[i]));
    };
    this._name=arguments[0];
    var name = arguments[0];
    console.log("This name is "+this._name);

}
testFunction("w",'e',3);
console.log(_name)
console.log();
testFunction.call({_age:12},"Pesho",4);
console.log();
testFunction.apply({_age:12},["Pesho",4]);
console.log();
testFunction.call(null,"Pesho",22)


