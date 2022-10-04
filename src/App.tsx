import { useRoutes } from "react-router";
import routes from "./routes/index";
import "./App.scss";

function App() {
	return <div>{useRoutes(routes)}</div>;
}

export default App;
