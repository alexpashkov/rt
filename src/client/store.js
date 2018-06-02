import { createStore } from "redux";
import * as R from "ramda";

export default createStore(R.identity);
