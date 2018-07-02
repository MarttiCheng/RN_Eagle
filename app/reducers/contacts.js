const initialTokenState = {
    contacts_all: [],
    contact_groups: [],
    contact_relationships: [],
    edit_contact_item: [],
    default_contactGroup_list: [],
    edit_contact_groups_item: [],
    selected_contactForTask: [],
    contact_id: '',
    contact_name: '',
    selected_contact_info: [],
}

function Contacts(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_CONTACTS_ALL' :
            return {
                ...state,
                contacts_all: action.data
            };
        case 'GET_CONTACT_ID' :
            return {
                ...state,
                contact_id: action.data
            };
        case 'GET_CONTACT_NAME' :
            return {
                ...state,
                contact_name: action.data
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
        case 'GET_DEFAULT_CONTACTGROUP_LIST' :
            return {
                ...state,
                default_contactGroup_list: action.data
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
        case 'EDIT_CONTACT_GROUPS_ITEM' :
            return {
                ...state,
                edit_contact_groups_item: action.data
            };
        case 'SELECTED_CONTACT_FOR_TASK' :
            return {
                ...state,
                selected_contactForTask: action.data
            };
        case 'SELECTED_CONTACT_INFO' :
            return {
                ...state,
                selected_contact_info: action.data
            };
        default :
            return state
    }
}

export default Contacts