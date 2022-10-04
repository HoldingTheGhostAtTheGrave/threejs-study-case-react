import { Layout, Card } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router";
import SiderComponents from "@/components/Sider";
import HeaderComponents from "@/components/Header";
import layoutScss from "./index.module.scss";
import routes from "@/routes";
import { useCallback, useState } from "react";
import { RouteObjectCustomize } from "@/type/index.type";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
const { Header, Sider, Content } = Layout;

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const setItemsSider = (routes: RouteObjectCustomize[]): MenuProps["items"] => {
	return routes.map((element) => {
		return getItem(
			element.label,
			element.path || "",
			element.icon,
			element.children && setItemsSider(element.children)
		);
	});
};

const itemsSider: MenuProps["items"] = setItemsSider(routes);

const LayoutComponents = () => {
	const [activeKey, setActiveKey] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const onMenuClick = useCallback((event: { key: string }) => {
		if (event.key === location.pathname) {
			return;
		}
		navigate({ pathname: event.key });
		setActiveKey(event.key);
	}, []);
	return (
		<div>
			<Layout>
				<Sider
					collapsedWidth='50'
					theme='light'
					className={layoutScss.sider}
					width='260'
				>
					<SiderComponents
						itemsSider={itemsSider}
						onMenuClick={onMenuClick}
						activeKey={activeKey}
					></SiderComponents>
				</Sider>
				<Layout>
					<Content>
						<Outlet></Outlet>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default LayoutComponents;
