var jkd3 = jkd3 || {};

// reusable accessor for getting and setting
jkd3.accessor = function(name, def_val){

    // if (typeof(def_val) != "undefined")
    // 	this[name] = def_val;
    
    return function(val){
	if (typeof(val) == "undefined") return this[name];
	this[name] = val;
	return this;
    };
};
