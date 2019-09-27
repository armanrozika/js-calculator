const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VIEW_NUMBER':
      return {
        ...state,
        value: action.payload
      };
    case 'CURRENT_VALUE':
      return {
        ...state,
        current_value: action.payload
      };
    case 'FINAL_VALUE':
      return {
        ...state,
        final: action.payload
      };
    default:
      return {
        ...state,
        value: '',
        final: 0,
        current_value: ''
      };
  }
}
