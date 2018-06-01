const initialTokenState = {
    tasks: [],
    tasks_completed: [],
    tasks_uncompleted: [],
    
}

function task(state = initialTokenState, action) {
    switch(action.type) {
        case 'GET_TASK_ITEM' :
            return {
                ...state,
                tasks: action.data
            };
        case 'GET_TASKS_COMPLETED':
            return {
                ...state,
                tasks_completed: action.data
            };
        case 'GET_TASKS_UNCOMPLETED' :
            return {
                ...state,
                tasks_uncompleted: action.data
            };
        case 'INIT_TASKS' : 
            return {
                ...state,
                tasks: [],
                tasks_completed: [],
                tasks_uncompleted: [],
            };
        default :
            return state
    }
}

export default task