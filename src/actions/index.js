// 标签页新增删除 选中 状态
export const ADD_LABEL_PAGE = "ADD_LABEL_PAGE";
export const REMOVE_LABEL_PAGE = "REMOVE_LABEL_PAGE";
export const TOGGLE_LABEL_SELECT = "TOGGLE_LABEL_SELECT"


export function addLabelPage(text) {
    return {type: ADD_LABEL_PAGE, text};
}

export function removeLabelPage(index) {
    return {type: REMOVE_LABEL_PAGE, index};
}

export function toggleLabelSelect(index) {
    return {type: TOGGLE_LABEL_SELECT, index}
}
