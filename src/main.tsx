import  ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
   <ToastContainer />
   <App />
  </BrowserRouter>
)