const signUpReducer = (state, { type, target, valid, data, isInvalid, invalidData, passwordsMatch, initialForm, initValue }) => {
    switch(type){
        case 'CHECK_FORM': {
            if(valid) {
                return state[target.name].hasOwnProperty('occupied') ? { ...state, [target.name]: { ...state[target.name], occupied: false , value: target.value, isValid: true }} : { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: target.value.length > 0 ? true : null }};
            } else {
                return state[target.name].hasOwnProperty('occupied') ? { ...state, [target.name]: { ...state[target.name], occupied: false, value: target.value, isValid: false }} : { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: false }};
            }
        }
        case 'CHECK_OCCUPIED': {
            if(valid){
                if(data.success || initValue === target.value){
                    return { ...state, [target.name]: { ...state[target.name], occupied: false }}
                } else {
                    return { ...state, [target.name]: { ...state[target.name], occupied: true, isValid: false }}
                }                
            } else {
                return { ...state }
            }
        }
        case 'CONFIRM_PASSWORD': {
            if(valid && target.value === state.password.value){
                return { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: true }}
            } else {
                return { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: false }}
            }
        } 
        case 'SUBMIT_FORM': {
            if(isInvalid){
                return { ...state, ...invalidData, confirmPassword: { ...state['confirmPassword'], isValid: passwordsMatch } }
            } else {
                if(data.success){
                    return { ...state, success: true, open: true, message: data.message }
                } else {
                    return { ...state, success: false, open: true, message: data.message }
                }
            }
        } 
        case 'SET_VALUE': {
            return { ...state, ...initValue }
        }
        case 'INITIAL_FORM': {
            return { ...state, ...initialForm }
        }
        default: {
            return { ...state }
        }
    } 
}

export default signUpReducer