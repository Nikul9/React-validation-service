export const initialState = null; 

export const reducer = (state , action)  => {
    if(action.type === "USER_ID") {
        return action.payload;
    }
    return state
}