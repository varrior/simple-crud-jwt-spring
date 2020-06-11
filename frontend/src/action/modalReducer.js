const modalReducer = (state, { type }) => {
    switch(type){
        case 'OPEN_MODAL': {
            return { ...state, modal: true }
        }
        case 'HIDE_MODAL': {
            return { ...state, modal: false }
        }        
        default: {
            return { ...state }
        }
    }
}

export default modalReducer