const initialTokenState = {
    token: '',
    user_id: '',
    usersList: []
}

function UserToken(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_TOKEN' :
            return {
                ...state,
                token: action.data
            };
        case 'USER_ID':
            return {
                ...state,
                user_id: action.data
            }
        case 'USER_LIST':
            return {
                ...state,
                usersList: action.data
            }
        case 'INIT_TOKEN' : 
            return {
                ...state,
                token: '',
                user_id: '',
            };
        default :
            return state
    }
}

export default UserToken