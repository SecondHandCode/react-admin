import {
    ADD_LABEL_PAGE,
    REMOVE_LABEL_PAGE,
    TOGGLE_LABEL_SELECT
} from "../actions";
import {combineReducers} from 'redux'

const initLabelPageState = localStorage.labelPage ? JSON.parse(localStorage.labelPage) : [{
    key: "9999999999999999999999",
    title: "首页",
    url: '/main/home',
    select: true,
    preventDeletion: true
}]

function todos(state, action) {
    let newState = [];
    switch (action.type) {
        case ADD_LABEL_PAGE:
            let sameKeyExists = false; // 是否存在相同表示
            let labelObj = {
                key: action.text.key,// 唯一标识
                title: action.text.title,
                url: action.text.url,
                select: true,
                preventDeletion:action.text.preventDeletion
            };
            newState = state.map((item) => {
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
            return newState;
        case REMOVE_LABEL_PAGE:
            let closeLabel = state.splice(action.index, 1)[0];
            // 如果被删除的是 选中的
            if (closeLabel.select) {
                if (state.length > 0) {
                    if (state[action.index]) {
                        state[action.index].select = true;
                    } else {
                        state[action.index - 1].select = true;
                    }
                }
            }
            return [...state];
        case TOGGLE_LABEL_SELECT:
            newState = state.map((item, index) => {
                if (index === action.index) {
                    item.select = true;
                } else {
                    item.select = false;
                }
                return item;
            });
            return newState;
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
        default:
            return state;

    }
};
const todoApp = combineReducers({
    todoLabelPage
})
export default todoApp

