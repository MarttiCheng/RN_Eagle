const initialTokenState = {
    selected_inspection: [],
    inspectionID: '',
    inspectionInfo: []
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
        default :
            return state
    }
}

export default Home