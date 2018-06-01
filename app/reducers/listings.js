const initialTokenState = {
    listings: [],
    selected_propertyForTask: [],
}

function Listings(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_LISTINGS' :
            return {
                ...state,
                listings: action.data
            };
        case 'SELECTED_PROPERTY_FOR_TASK' :
            return {
                ...state,
                selected_propertyForTask: action.data
            };
        default :
            return state
    }
}

export default Listings