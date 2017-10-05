// reusable accessor for getting and setting
var accessor = function(name, def_val){

    // if (typeof(def_val) != "undefined")
    // 	this[name] = def_val;
    
    return function(val){
	if (typeof(val) == "undefined") return this[name];
	this[name] = val;
	return this;
    };
};
