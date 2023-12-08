//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
//import 'react-toastify/dist/ReactToastify.css';

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

import i18n from "./translations"; // import i18n from translations.js

//render your react application
ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Layout />
    </I18nextProvider>,
    document.querySelector("#app")
  );
