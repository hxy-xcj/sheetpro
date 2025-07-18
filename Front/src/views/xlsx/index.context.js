import { createContext, useContext, createRef } from 'react';

const RetrieveContext = createContext();
export const retrieveInitState = {
  excelFile:undefined,
  columns:[],
  template_id:0,
  params:[],
  headers:[]
}
function useRetrieveContext() {
  const context = useContext(RetrieveContext);
  if (context === undefined) {
    throw new Error('getRetrieveContext 必须在 RetrieveContext.Provider 内使用');
  }
  return context;
}


function RetrieveReducer(state, action) {
  switch (action.type) {
    case 'setState':
      return {...state,...action,};
    default:
      throw new Error();
  }
}
export { RetrieveContext, RetrieveReducer, useRetrieveContext };