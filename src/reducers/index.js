import {
    ADD_LABEL_PAGE,
    REMOVE_LABEL_PAGE,
    TOGGLE_LABEL_SELECT,
    CLOSE_ALL_LABEL,
    CLOSE_OTHER_LABEL
} from "../actions";
import {combineReducers} from 'redux'

const todoList = localStorage.labelPage ? JSON.parse(localStorage.labelPage) : [{
    key: "9999999999999999999999",
    title: "首页",
    url: '/main/home',
    select: true,
    preventDeletion: true
}];
const initLabelPageState = {
    type: '',
    todos: todoList
}
function todos(state, action) {
    let newState = [];// 每次返回的对象
    let sameKeyExists = false; // 是否存在相同表示;
    let hasPreventDeletion = false;// 全部删除的时候 记录一个不能删除的 select
    switch (action.type) {
        case ADD_LABEL_PAGE:
            sameKeyExists = false;
            let labelObj = {
                key: action.text.key,// 唯一标识
                title: action.text.title,
                url: action.text.url,
                select: true,
                preventDeletion:action.text.preventDeletion
            };
            newState = state.todos.map((item) => {
                if (item.key === action.text.key) {
                    sameKeyExists = true;
                    item.select = true;
                } else {
                    item.select = false;
                }
                return item;
            });
            if (!sameKeyExists) {
                newState.push(labelObj)
            }
            return {type: ADD_LABEL_PAGE, todos: newState};
        case REMOVE_LABEL_PAGE:
            let closeLabel = state.todos.splice(action.index, 1)[0];
            // 如果被删除的是 选中的
            if (closeLabel.select) {
                if (state.todos.length > 0) {
                    if (state.todos[action.index]) {
                        state.todos[action.index].select = true;
                    } else {
                        state.todos[action.index - 1].select = true;
                    }
                }
            }
            return {type: REMOVE_LABEL_PAGE, todos: newState};
        case TOGGLE_LABEL_SELECT:
            newState = state.todos.map((item, index) => {
                if (index === action.index) {
                    item.select = true;
                } else {
                    item.select = false;
                }
                return item;
            });
            return {type: TOGGLE_LABEL_SELECT, todos: newState};
        case  CLOSE_ALL_LABEL:
            newState = [];
            hasPreventDeletion = false;
            for (let i = 0, len = state.todos.length; i < len; i++) {
                // 无法被删除的
                if (state.todos[i].preventDeletion) {
                    newState.push(state.todos[i]);
                    if (!hasPreventDeletion) {
                        state.todos[i].select = true;
                        hasPreventDeletion = true;
                    }
                }
            }
            return {type: CLOSE_ALL_LABEL, todos: newState};
        case CLOSE_OTHER_LABEL:
            newState = state.todos.filter(item => item.preventDeletion || item.select)
            return {type: CLOSE_OTHER_LABEL, todos: newState};
        default:
            return [...state];
    }
}

function todoLabelPage(state = initLabelPageState, action) {
    switch (action.type) {
        case ADD_LABEL_PAGE:
            return todos(state, action);
        case REMOVE_LABEL_PAGE:
            return todos(state, action);
        case TOGGLE_LABEL_SELECT:
            return todos(state, action);
        case  CLOSE_ALL_LABEL:
            return todos(state, action);
        case CLOSE_OTHER_LABEL:
            return todos(state, action);
        default:
            return state;

    }
};
const todoApp = combineReducers({
    todoLabelPage
})
export default todoApp

