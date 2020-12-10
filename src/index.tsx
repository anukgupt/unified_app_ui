import React from 'react';
import ReactDOM from 'react-dom';
import Template from "./components/Template";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Template />, document.getElementById("root")
);
serviceWorker.unregister();
