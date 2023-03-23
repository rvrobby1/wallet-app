import * as actionType from "./actionsType";

export const getTransactions = (payload) => {
  return {
    type: actionType.GET_TRANSACTIONS_LIST,
    transactionPayload : payload
  };
};
