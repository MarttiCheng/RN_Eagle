const initialTokenState = {
    contacts: [],
    contact_groups: [],
    contact_relationships: [],
}

function Contacts(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_CONTACTS' :
            return {
                ...state,
                contacts: action.data
            };
        case 'GET_CONTACTS_GROUP':
            return {
                ...state,
                contact_groups: action.data
            };
        case 'GET_CONTACTS_RELATIONSHIP' :
            return {
                ...state,
                contact_relationships: action.data
            };
        case 'INIT_CONTACTS' : 
            return {
                ...state,
                contacts: []
            };
        default :
            return state
    }
}

export default Contacts