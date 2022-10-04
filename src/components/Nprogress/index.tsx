import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

const Nprogress = () => {
	useEffect(() => {
		nprogress.start();
		return () => {
			nprogress.done();
		};
	}, []);
	return <div></div>;
};
export default Nprogress;
