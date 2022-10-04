import { memo, useState } from "react";
import { Menu, MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

// 定于类型
interface Props {
	activeKey: string;
	itemsSider: MenuItem[] | undefined;
	onMenuClick: (event: { key: string }) => void;
}

const Sider = (props: Props) => {
	return (
		<div>
			<div>
				<Menu
					onClick={props.onMenuClick}
					selectedKeys={[props.activeKey]}
					mode='inline'
					theme='light'
					items={props.itemsSider}
				/>
			</div>
		</div>
	);
};

export default memo(Sider);
