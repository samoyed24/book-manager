export const GeneralDeltaColor = {
    Up: '#fd4e2e',
    Down: '#28bc37',
    None: '#8d8a8a',
};
export const GeneralStatusColor = {
    Error: '#fd4e2e',
    Correct: '#28bc37',
};
export function getColorFromStatus(status) {
    return status ? GeneralStatusColor.Correct : GeneralStatusColor.Error;
}
export function getYesOrNoFromStatus(status) {
    return status ? '是' : '否';
}
