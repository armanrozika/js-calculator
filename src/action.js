export function add(stringNumber) {
  return {
    type: 'SET_VIEW_NUMBER',
    payload: stringNumber
  };
}

export function final(value) {
  return {
    type: 'FINAL_VALUE',
    payload: value
  };
}

export function setCurrent(value) {
  return {
    type: 'CURRENT_VALUE',
    payload: value
  };
}
