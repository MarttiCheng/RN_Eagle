const initialTokenState = {
    tasks: [],
    tasks_completed: [],
    tasks_uncompleted: [],
    task_detail_info: [],
    task_flag: '0'
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
        case 'GET_TASK_DETAIL_INFO' :
            return {
                ...state,
                task_detail_info: action.data
            };
        case 'SET_TASK_FLAG' :
            return {
                ...state,
                task_flag: action.data
            };
        case 'INIT_TASKS' : 
            return {
                ...state,
                tasks: [],
                tasks_completed: [],
                tasks_uncompleted: [],
                task_detail_info: [],
            };
        default :
            return state
    }
}

export default task