const formReducer = (state, { type, target, valid=true, data, isInvalid, invalidData, initialForm }) => {

    switch(type){
        case 'CHECK_FORM': {
            if(valid && target.value.length !== 0) {                
                return { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: true }};
            } else {
                return { ...state, [target.name]: { ...state[target.name], value: target.value, isValid: false }};
            }
        } 
        case 'LOGIN_FORM': {
            if(isInvalid){
                return { ...state, ...invalidData }
            } else {
                if(data.success){
                    return { ...state, message: data.message, open: true, resendActivationEmail: false, success: true }
                } else if(!data.success && data.expired){
                    return { ...state, message: data.message, open: true, resendActivationEmail: true, expired: true }
                } else {
                    return { ...state, message: data.message, open: true, success: false, expired: false }
                }
            }
        } 
        case 'INITIAL_FORM': {
            return { ...state, ...initialForm }
        }
        default: {
            return { ...state }
        }  
    } 
}

export default formReducer