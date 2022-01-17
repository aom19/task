import { configureStore } from "@reduxjs/toolkit";

import partnersReducer from "../redux/reducers/partners";
import userReducer from "../redux/reducers/auth";

export default configureStore(
  {
    reducer: {
      user: userReducer,
      partners: partnersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
