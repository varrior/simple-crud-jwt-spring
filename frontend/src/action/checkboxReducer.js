const checkboxReducer = (state, { type }) => {
    switch(type){
        case 'TOGGLE_CHECKBOX': {
            return { ...state, checked: !state.checked }
        }      
        default: {
            return { ...state }
        }
    }
}

export default checkboxReducer