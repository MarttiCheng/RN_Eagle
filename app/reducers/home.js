const initialTokenState = {
    selected_inspection: [],
    inspectionID: '',
    inspectionInfo: [],
    attendee_mayinterested_List: [],
    attendee_interested_List: [],
    attendee_notinterested_List: [],
    selected_home_note: [],
}

function Home(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_INSPECTIONS_RELATIONSHIP' :
            return {
                ...state,
                selected_inspection: action.data
            };
        case 'ISPECTION_ID' :
            return {
                ...state,
                inspectionID: action.data
            };
        case 'ISPECTION_INFO' :
            return {
                ...state,
                inspectionInfo: action.data
            };
        case 'ATTENDEES_MAYINTERESTED' :
            return {
                ...state,
                attendee_mayinterested_List: action.data
            };
        case 'ATTENDEES_INTERESTED' :
            return {
                ...state,
                attendee_interested_List: action.data
            };
        case 'ATTENDEES_NOTINTERESTED' :
            return {
                ...state,
                attendee_notinterested_List: action.data
            };
        case 'SELECTED_HOME_NOTE' :
            return {
                ...state,
                selected_home_note: action.data
            };
        default :
            return state
    }
}

export default Home