reportApp.service('LocalStorageService', function(){
    
    /**
     * Get the local storage if it's supported by the browser
     * @returns {window.localStorage}
     */
    var getLocalStorage = function(){
        try {
            if (!! window.localStorage) return window.localStorage;
        } catch(e) {
            return undefined;
        }
    };
    
    /**
     * Check if local storage object exists, if not create default
     * @param {Object} params
     * @returns {JSON} item
     */
    var localStorageObj = function(params) {
        
        // check in local storage for current storageKey
        var item = getLocalStorage().getItem(params.storageKey);
        
        // if no value is saved, create with default values
        if (item === null) {
            getLocalStorage().setItem(params.storageKey, JSON.stringify(params.defaultValues));
            item = getLocalStorage().getItem(params.storageKey);
        }
        
        return JSON.parse(item);
    };

    /**
     * Get a value for a given key from the local storage
     * @param {Object} params
     * @param {string} key
     * @returns {var} value
     */
    this.getLSValue = function(params, key){
        var obj = localStorageObj(params);
        
        return obj[key];
    };

    /**
     * Set a value for a given key in the local storage
     * @param {Object} params
     * @param {string} key
     * @param {var} value
     */
    this.setLSValue = function(params, key, value) {
        var obj = localStorageObj(params);
        obj[key] = value;
        
        // save object in local storage
        getLocalStorage().setItem(params.storageKey, JSON.stringify(obj));
    };
    
    /**
     * Remove an item from the local storage
     * @param {Object} params
     */
    this.removeItem = function(params){
        getLocalStorage().removeItem(params.storageKey);
    };
});
