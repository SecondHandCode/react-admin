// 标签页新增删除 选中 状态
export const ADD_LABEL_PAGE = "ADD_LABEL_PAGE";
export const REMOVE_LABEL_PAGE = "REMOVE_LABEL_PAGE";
export const TOGGLE_LABEL_SELECT = "TOGGLE_LABEL_SELECT"
export const CLOSE_ALL_LABEL = "CLOSE_ALL_LABEL";
export const CLOSE_OTHER_LABEL = "CLOSE_OTHER_LABEL";

export function addLabelPage(text) {
    return {type: ADD_LABEL_PAGE, text};
}

export function removeLabelPage(index) {
    return {type: REMOVE_LABEL_PAGE, index};
}

export function toggleLabelSelect(index) {
    return {type: TOGGLE_LABEL_SELECT, index}
}
// 关闭所有标签， preventDeletion 不关闭
export function closeAllLabel() {
    return {type: CLOSE_ALL_LABEL}
}
// 关闭当前选中以外的标签， preventDeletion 不关闭
export function closeOtherLabel() {
    return {type: CLOSE_OTHER_LABEL}
}
