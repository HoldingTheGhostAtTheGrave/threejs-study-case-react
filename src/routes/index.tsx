import { lazy, Suspense } from "react";
import Nprogress from "@/components/Nprogress";
import { RouteObjectCustomize } from "@/type/index.type";
import { AppstoreOutlined } from "@ant-design/icons";

const routes: RouteObjectCustomize[] = [
	{
		path: "/",
		label: "threeJS 案例列表",
		element: lazy(() => import("@/pages/layout")),
		icon: <AppstoreOutlined />,
		children: [
			{
				index: true,
				label: "首页",
				element: lazy(() => import("@/pages/index")),
			},
			{
				path: "/3d-vr-house-viewing",
				label: "3d 看房",
				element: lazy(() => import("@/pages/3d-vr-house-viewing")),
			},
			{
				path: "/about",
				label: "关于我们",
				element: lazy(() => import("@/pages/about")),
			},
		],
	},
];

// 处理动态路由
export const syncRouter = (
	table: RouteObjectCustomize[]
): RouteObjectCustomize[] => {
	let mRouteTable: RouteObjectCustomize[] = [];
	table.forEach((route: any) => {
		mRouteTable.push({
			index: route.index,
			path: route.path,
			element: route.element && (
				<Suspense fallback={<Nprogress />}>
					<route.element />
				</Suspense>
			),
			icon: route.icon,
			label: route.label,
			children: route.children && syncRouter(route.children),
		});
	});
	return mRouteTable;
};

export default syncRouter(routes);
