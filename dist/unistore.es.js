function assign(obj, props) {
    for (var i in props) 
        { obj[i] = props[i]; }
    return obj;
}

function createStore(state) {
    var listeners = [];
    state = state || {};
    function unsubscribe(listener) {
        var out = [];
        for (var i = 0;i < listeners.length; i++) {
            if (listeners[i] === listener) {
                listener = null;
            } else {
                out.push(listeners[i]);
            }
        }
        listeners = out;
    }
    
    function setState(update, overwrite) {
        state = overwrite ? update : assign(assign({}, state), update);
        var currentListeners = listeners;
        for (var i = 0;i < currentListeners.length; i++) 
            { currentListeners[i](state); }
    }
    
    return {
        action: function action(action$1) {
            return function () {
                var arguments$1 = arguments;

                var args = [state];
                for (var i = 0;i < arguments.length; i++) 
                    { args.push(arguments$1[i]); }
                var ret = action$1.apply(this, args);
                if (ret != null) {
                    if (ret.then) 
                        { ret.then(setState); }
                     else 
                        { setState(ret); }
                }
            };
        },
        setState: setState,
        subscribe: function subscribe(listener) {
            listeners.push(listener);
            return function () {
                unsubscribe(listener);
            };
        },
        unsubscribe: unsubscribe,
        getState: function getState() {
            return state;
        }
    };
}

export default createStore;
//# sourceMappingURL=unistore.es.js.map
