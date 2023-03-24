import axios from "axios";
export const base_url = process.env.REACT_APP_API_URL

export function* GetTransactionsApi(transactionPayload) {
    const transactions = yield axios
      .post(`${base_url}/transactiondetails`, transactionPayload)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
    return transactions;
  }
  