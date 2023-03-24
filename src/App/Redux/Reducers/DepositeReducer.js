import * as actionType from '../Actions/actionsType'
const initialState = {
  Deposit_detail: null,
  requestDeposite:null,
  isLoading: false,
  error: null,
}

const DepositReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DEPOSIT_DETAIL:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case actionType.GET_DEPOSIT_DETAIL_SUCCESS:
      return {
        ...state,
        Deposit_detail: action.data,
        isLoading: false,
      }
    case actionType.GET_CLIENT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
 
      case actionType.REQUEST_DEPOSIT:
        return {
          ...state,
          isLoading: true,
          error: '',
        }
      case actionType.REQUEST_DEPOSIT_SUCCESS:
        return {
          ...state,
          requestDeposite: action.data,
          isLoading: false,
        }
      case actionType.GET_CLIENT_LIST_FAIL:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
   
    default:
      return state
  }
}
export default DepositReducer
