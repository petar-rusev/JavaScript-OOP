
function processRestaurantManagerCommands(commands) {
    'use strict';
    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    }
    Array.prototype.remove = function(value) {
        var idx = this.indexOf(value);
        if (idx != -1) {
            return this.splice(idx, 1); // The second parameter is the number of elements to remove.
        }
        return false;
    }

    var RestaurantEngine = (function () {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Restaurant = (function () {

            function Restaurant(name,location){
                this.setName(name);
                this.setLocation(location);
                this._recipes=[];
            }
            Restaurant.prototype.getRecipes=function(){
                return this._recipes;
            }

            Restaurant.prototype.setName=function(name){
                if(typeof name!="string"){
                    throw new TypeError("The type of the name must be string");
                }
                if(!name){
                    throw new Error("The name can't be empty or null string");
                }
                this._name=name;
            }
            Restaurant.prototype.getName=function(){
                return this._name;
            }
            Restaurant.prototype.setLocation=function(location){
                if(typeof location!="string"){
                    throw new TypeError("The type of the location must be a string");
                }
                if(!location){
                    throw new Error("The location can't be empty or null string");
                }
                this._location=location;
            }
            Restaurant.prototype.getLocation=function(){
                return this._location;
            }
            Restaurant.prototype.addRecipe=function(recipe){
                this._recipes.push(recipe)
            }
            Restaurant.prototype.removeRecipe=function(recipe){
                this._recipes.remove(recipe);
            }
            Restaurant.prototype.printRestaurantMenu=function(){
                var output="***** "+this.getName()+" - "+this.getLocation()+" *****\n";
                var outSalads="";
                var outDrinks="";
                var outMain="";
                var outDesert="";
                if(this.getRecipes().length==0){
                    output+="No recipes... yet\n";
                }
                else{
                    var drinks=[];
                    var salads=[];
                    var main=[];
                    var deserts=[];
                    for(var i=0;i<this._recipes.length;i++){
                        if(this._recipes[i] instanceof Drink){
                            drinks.push(this._recipes[i]);
                        }
                        if(this._recipes[i] instanceof Salad){
                            salads.push(this._recipes[i]);
                        }
                        if(this._recipes[i] instanceof MainCourse){
                            main.push(this._recipes[i]);
                        }
                        if(this._recipes[i] instanceof Dessert){
                            deserts.push(this._recipes[i]);
                        }
                    }
                    if(drinks.length>0){
                        outDrinks+="~~~~~ DRINKS ~~~~~\n";
                        for(var i=0;i<drinks.length;i++){
                            outDrinks+=drinks[i].toString()+"\n";
                        }


                    }
                    if(salads.length>0){
                        outSalads+="~~~~~ SALADS ~~~~~\n";
                        for(var i=0;i<salads.length;i++){
                            outSalads+=salads[i].toString()+"\n";
                        }


                    }
                    if(main.length>0){
                        outMain+="~~~~~ MAIN COURSES ~~~~~\n";
                        for(var i=0;i<main.length;i++){
                            outMain+=main[i].toString()+"\n";
                        }


                    }
                    if(deserts.length>0){
                        outDesert+="~~~~~ DESSERTS ~~~~~\n";
                        for(var i=0;i<deserts.length;i++){
                            outDesert+=deserts[i].toString()+"\n";
                        }


                    }

                }
                return output+outDrinks+outSalads+outMain+outDesert;
            }
            return Restaurant;
        }());

        var Recipe = (function () {

            function Recipe(name,price,calories,quantity,time){
                if(this.constructor===Recipe){
                    throw new Error("The base class can not be instantiated");
                }
                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this._unit="g";
                this.setTime(time);
            }
            //Recipe unit getter
            Recipe.prototype.getUnit=function(){
                return this._unit;
            }
            //Recipe time setter
            Recipe.prototype.setTime=function(time){

                if(time<0){
                    throw new RangeError("The time must be a positive number");
                }
                if(this.constructor==Drink){
                    if(time>20){
                        throw new RangeError("The time to prepare a drink can not be more than 20 minutes");
                    }
                }
                this._time=time;
            }
            //Recipe time getter
            Recipe.prototype.getTime=function(){
                return this._time;
            }
            //Recipe Name setter
            Recipe.prototype.setName=function(name){
                if(typeof name!="string"){
                    throw new TypeError("The name must be a string type");
                }
                if(!name){
                    throw new Error("The name can not be a null string");
                }
                this._name=name;
            }
            //Recipe name getter
            Recipe.prototype.getName=function(){
                return this._name;
            }
            //Recipe price setter
            Recipe.prototype.setPrice=function(price){

                if(price<0){
                    throw new RangeError("The price must be positive number");
                }
                this._price=price;
            }
            ///Recipe price getter
            Recipe.prototype.getPrice=function(){
                return this._price;
            }
            //Recipe callories setter
            Recipe.prototype.setCalories=function(calories){

                if(calories<0){
                    throw new RangeError("The callories must be positive number");
                }
                if(this.constructor==Drink){
                    if(calories>100){
                        throw new RangeError("The calories in a drink can not be more than 100");
                    }
                }
                this._calories=calories;
            }
            //Recipe callories getter
            Recipe.prototype.getCalories=function(){
                return this._calories;
            }
            //Recipe quant setter
            Recipe.prototype.setQuantity=function(quantity){

                if(quantity<0){
                    throw new RangeError("The quantity must be a positive number");
                }

                this._quantity=quantity;
            }
            //Recipe quant getter
            Recipe.prototype.getQuantity=function(){
                return this._quantity;
            }

            //To String method
            Recipe.prototype.toString=function(){

                return "==  "+this.getName()+" == $"+this.getPrice().toFixed(2)+"\nPer serving: "+this.getQuantity()+" "+this.getUnit()+
                    ", "+this.getCalories()+" kcal"+"\nReady in "+this.getTime()+" minutes";

            }
            return Recipe;
        }());

        var Drink = (function () {
            function Drink(name,price,calories,quantity,time,carbonated){
                Recipe.apply(this,arguments);
                this.setCarbonated(carbonated);
                this._unit="ml";
            }
            Drink.extends(Recipe);

            //Drink carbonated setter
            Drink.prototype.setCarbonated=function(carbonated){
                this._carbonated=carbonated;
                //check for validation row 408
            }
            //Drink carbonated getter
            Drink.prototype.getCarbonated=function(){
                return this._carbonated;
            }
            Drink.prototype.toString=function(){
                var carbonated=this.getCarbonated()?'yes':'no';
                return Recipe.prototype.toString.call(this)+"\nCarbonated: "+carbonated;
            }
            return Drink;
        }());

        var Meal = (function () {
            function Meal(name,price,calories,quantity,time,isVegan){
                if(this.constructor===Meal){
                    throw new Error("The base class can not be instantiated");
                }
                Recipe.apply(this,arguments);
                this.setVegan(isVegan);
            }
            Meal.extends(Recipe);
            Meal.prototype.setVegan=function(vegan){
                this._isVegan=vegan;
            }
            Meal.prototype.getVegan=function(){
                return this._isVegan;
            }
            Meal.prototype.toggleVegan=function(){
               return this.setVegan(!this.getVegan());
            }
            Meal.prototype.toString=function(){
                var checkVegan=this.getVegan()?"[VEGAN] ":"";
                return checkVegan+Recipe.prototype.toString.call(this);

            }
            return Meal;
        }());

        var Dessert = (function () {
            function Dessert(name,price,calories,quantity,time,isVegan){
                Meal.apply(this,arguments);
                this.setSugar(true);
            }
            Dessert.extends(Meal);
            Dessert.prototype.setSugar=function(sugar){
                this._withSugar=sugar;
            }
            Dessert.prototype.getSugar=function(){
                return this._withSugar;
            }
            Dessert.prototype.toggleSugar=function(){
                this.setSugar(!this.getSugar());
            }
            Dessert.prototype.toString=function(){
                var checkSugar=this.getSugar()?"":"[NO SUGAR] ";
                return checkSugar+Meal.prototype.toString.call(this);

            }
            return Dessert;
        }());

        var MainCourse = (function () {
            function MainCourse(name,price,calories,quantity,time,isVegan,type){
                Meal.apply(this,arguments);
                this.setType(type);

            }
            MainCourse.extends(Meal);

            MainCourse.prototype.setType=function(type){
                if(typeof type!="string"){
                    throw new TypeError("The type of the maincourse type must be a string")
                }
                if(!type){
                    throw new Error("The type can not be empty or null string");
                }
                this._type=type;
            }
            MainCourse.prototype.getType=function(){
                return this._type;
            }
            MainCourse.prototype.toString=function(){
                return Meal.prototype.toString.call(this)+"\nType: "+this.getType();
            }
            return MainCourse;
        }());

        var Salad = (function () {
            function Salad(name,price,calories,quantity,time,type,pasta){
                Meal.apply(this,arguments)
                this.setPasta(pasta);
                this.setVegan(true);

            }
            Salad.extends(Meal);

            Salad.prototype.setPasta=function(pasta){
                this._pasta=pasta;
            }
            Salad.prototype.getPasta=function(){
                return this._pasta;
            }
            Salad.prototype.toString=function(){
                var isPasta=this.getPasta()?'yes':'no';
                return Meal.prototype.toString.call(this)+"\nContains pasta: "+isPasta;
            }
            return Salad;
        }());

        var Command = (function () {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function (e) { return true });

                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                        .split("=")
                        .filter(function (e) { return true; });
                    self._params[split[0]] = split[1];
                });
            }

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());
    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}




