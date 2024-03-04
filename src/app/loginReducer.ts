import { createReducer, on } from "@ngrx/store";
import { initialState } from "./loginState";
import { loginAdminAction, loginFacultyAction, loginStudentAction } from "./loginAction";



export const _loginReducer = createReducer(initialState,
    on(
        loginAdminAction,
        (state: any) => {
            return {
                ...initialState,
                data: state.Role+"Admin"
            }
        }),
    on(
        loginFacultyAction,
        (state: any) => {
            return {
                ...initialState,
                data: state.Role+"Faculty"
            }
        }),
    on(
        loginStudentAction,
        (state: any) => {
            return {
                ...initialState,
                data: state.Role+"Student"
            }
        }),
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action);
}