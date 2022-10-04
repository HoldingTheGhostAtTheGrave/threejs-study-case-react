import { useLocation, useRoutes } from "react-router";
import routes from "./routes/index";
import BeforEach from "@/components/BeforEach";

import "./App.scss";

function App() {
	const location = useLocation();
	return (
		<div>
			<div>
				<BeforEach pathname={location.pathname}></BeforEach>
			</div>
			{useRoutes(routes)}
		</div>
	);
}

export default App;
