const initialTokenState = {
    token: ''
}

function UserToken(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_TOKEN' :
            return {
                ...state,
                token: action.data
            };
        case 'INIT_TOKEN' : 
            return {
                ...state,
                token: ''
            };
        default :
            return state
    }
}

export default UserToken