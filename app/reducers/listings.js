const initialTokenState = {
    listings: [],
}

function Listings(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_LISTINGS' :
            return {
                ...state,
                listings: action.data
            };
        default :
            return state
    }
}

export default Listings