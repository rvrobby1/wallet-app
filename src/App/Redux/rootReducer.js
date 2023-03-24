import { combineReducers } from "redux";
import AuthReducer from "./Reducers/AuthReducer";
import DepositReducer from "./Reducers/DepositeReducer";
import HawalaReducer from "./Reducers/HawalaReducer";
import CountryReducer from "./Reducers/CountryReducer";
import WalletReducer from "./Reducers/WalletReducer";
import TransactionReducer from "./Reducers/TransactionReducer";

const rootReducer = combineReducers({
  user: AuthReducer,
  hawala: HawalaReducer,
  deposit: DepositReducer,
  country: CountryReducer,
  wallet:WalletReducer,
  transactionData: TransactionReducer
});

export default rootReducer;
