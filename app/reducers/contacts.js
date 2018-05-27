const initialTokenState = {
    contacts_all: [],
    contact_groups: [],
    contact_relationships: [],
    edit_contact_item: []
}

function Contacts(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_CONTACTS_ALL' :
            return {
                ...state,
                contacts_all: action.data
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
        case 'EDIT_CONTACT_ITEM' :
            return {
                ...state,
                edit_contact_item: action.data
            };
        default :
            return state
    }
}

export default Contacts