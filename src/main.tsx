import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
