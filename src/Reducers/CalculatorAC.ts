import { Dispatch } from "redux";

export type CalculatorReducerActionsType =
    | ReturnType<typeof updateAnswerValue>
    | ReturnType<typeof updateCurrentValue>
    | ReturnType<typeof calculateAnswerValue>
    | ReturnType<typeof changeModeValue>
    | ReturnType<typeof clearAnswerValue>

export const updateAnswerValue = (value: string): { type: 'UPDATE-ANSWER', value: string } => {
    return { type: 'UPDATE-ANSWER', value }
}

export const updateCurrentValue = (value: string): { type: 'UPDATE-CURRENT', value: string } => {
    return { type: 'UPDATE-CURRENT', value }
}

export const calculateAnswerValue = (value: string): { type: 'CALCULATE-ANSWER', value: string } => {
    return { type: 'CALCULATE-ANSWER', value }
}

export const clearAnswerValue = (): { type: 'CLEAR-ANSWER' } => {
    return { type: 'CLEAR-ANSWER' }
}

export const changeModeValue = (value: string): { type: 'CHANGE-MODE', value: string } => {
    return { type: 'CHANGE-MODE', value }
}

export const updateUserNameTC = (value: string) => (dispatch: Dispatch) => {
    dispatch(updateAnswerValue(value))
}