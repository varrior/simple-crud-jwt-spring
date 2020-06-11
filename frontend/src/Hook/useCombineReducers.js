const useCombineReducers = (...combinedReducers) => {
    let state, dispatch
    if(combinedReducers.every(element => Array.isArray(element))) {
         state = combinedReducers.reduce((acc, key) => ({ ...acc, ...key[0] }),{});
         dispatch = action => combinedReducers.map(element => element[1]).forEach(fc => fc(action));
    } else {
        state = Object.values(...combinedReducers).reduce((acc, key) => ({ ...acc, ...key[0] }),{});
        dispatch = (action,type) => {
          return Object.keys(...combinedReducers).includes(type) ? combinedReducers[0][type][1](action) : Object.values(...combinedReducers).forEach(fc => fc[1](action))};        
    } 
    return [state, dispatch];
  };

export default useCombineReducers
