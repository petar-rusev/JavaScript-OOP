var specialConsole =(function() {
    function Console(){
    }
    Console.prototype.writeLine = function writeLine(){
        if (arguments.length==1) {
            console.log(arguments[0]);
        }
        else{
            console.log(arguments[0].replace("{0}", arguments[1]));
        }
    }

    Console.prototype.writeError = function writeLine(){
        if (arguments.length==1) {
            console.log(arguments[0]);
        }
        else{
            console.log(arguments[0].replace("{0}", arguments[1]));
        }
    }

    Console.prototype.writeWarning = function writeLine(){
        if (arguments.length==1) {
            console.log(arguments[0]);
        }
        else{
            console.log(arguments[0].replace("{0}", arguments[1]));
        }
    }

    return new Console
})();


specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");