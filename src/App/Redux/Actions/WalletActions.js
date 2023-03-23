import * as actionType from './actionsType'

//GET COUNTRY LIST
export const getCountriesData = () => {
  return {
    type: actionType.GET_COUNTRY,
  }
}

// GET DEPOSIT DETAILS
export const GetDepositDetail = () => {
  return {
    type: actionType.DEPOSIT_DETAIL,
  }
}
// REQUEST DEPOSIT
export const RequestDeposite = (depositData) => {
  return {
    type: actionType.REQUEST_DEPOSIT,
    depositData,
  }
}

// GET HAWALA LIST
export const GetHawalaList = () => {
  return {
    type: actionType.HAWALA_LIST,
  }
}

// GET CLIENT LIST
export const GetClientList = () => {
  return {
    type: actionType.CLIENT_LIST,
  }
}
// GET WALLET BALANCE
export const GetWalletBalance = (walletData) => {
  return {
    type: actionType.GET_WALLET_BALANCE,
    walletData,
  }
}

//  WITHDRAW REQUEST
export const WithDrawRequest = (withDrawData) => {
  return {
    type: actionType.WITHDRAW_REQUEST,
    withDrawData,
  }
}

//  WITHDRAW REQUEST
export const ThirdPartyTransactionAction = (TransData) => {
  return {
    type: actionType.THIRD_PARTY_TRANSACTION,
    TransData,
  }
}


export const DealerAction = (userId) => {
  return {
    type: actionType.BECOME_DEALER_REQUEST,
    userId
  }
}