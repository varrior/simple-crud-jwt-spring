const loadingReducer = (state, { type, isLoaded, loadingName='' }) => {

    switch(type){
        case 'LOADING': {
            return { ...state, isLoaded, loadingName }
        }
        default: {
            return { ...state } 
        }
    }
}

export default loadingReducer