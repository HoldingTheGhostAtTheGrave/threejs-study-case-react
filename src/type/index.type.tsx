import { RouteObject } from "react-router";
import { ReactNode } from "react";

interface RouteObjectCustomizeChildren extends RouteObjectCustomize {}

export interface RouteObjectCustomize extends RouteObject {
	label?: string;
	path?: string;
	icon?: ReactNode;
	children?: RouteObjectCustomizeChildren[];
}
