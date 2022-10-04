import { useEffect } from "react";
import nprogress from "nprogress";

interface BeforEachProp {
	pathname: string;
}

const BeforEach = (pathname: BeforEachProp) => {
	useEffect(() => {
		nprogress.done();
		return () => {
			nprogress.start();
		};
	}, [pathname]);
	return <div></div>;
};

export default BeforEach;
