import { useEffect, useState } from "react";
import { Threejs } from "@/threejs";
import { Scene, Camera } from "three";
import * as THREE from "three";
import { DownOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./index.scss";

const boxColor = [
	{
		imgSrc: "/public/imgs/living/",
		logo: "/public/imgs/living/4_l.jpg",
		label: "客厅",
		list: ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"],
	},
	{
		imgSrc: "/public/imgs/restroom/",
		label: "洗手间 过道",
		logo: "/public/imgs/restroom/7_l.jpg",
		list: ["7_l", "7_r", "7_u", "7_d", "7_b", "7_f"],
	},
	{
		imgSrc: "/public/imgs/second-bedroom/",
		label: "次卧",
		logo: "/public/imgs/second-bedroom/11_l.jpg",
		list: ["11_l", "11_r", "11_u", "11_d", "11_b", "11_f"],
	},
	{
		imgSrc: "/public/imgs/childroom/",
		label: "儿童房",
		logo: "/public/imgs/childroom/19_l.jpg",
		list: ["19_l", "19_r", "19_u", "19_d", "19_b", "19_f"],
	},
	{
		imgSrc: "/public/imgs/kitchen/",
		label: "厨房",
		logo: "/public/imgs/kitchen/2_l.jpg",
		list: ["2_l", "2_r", "2_u", "2_d", "2_b", "2_f"],
	},
	{
		imgSrc: "/public/imgs/kitchen-aisle/",
		label: "厨房 过道",
		logo: "/public/imgs/kitchen-aisle/0_l.jpg",
		list: ["0_l", "0_r", "0_u", "0_d", "0_b", "0_f"],
	},
	{
		imgSrc: "/public/imgs/bedroom/",
		label: "卧室",
		logo: "/public/imgs/bedroom/23_l.jpg",
		list: ["23_l", "23_r", "23_u", "23_d", "23_b", "23_f"],
	},
	{
		imgSrc: "/public/imgs/bedroom-door/",
		label: "卧室 过道",
		logo: "/public/imgs/bedroom-door/20_l.jpg",
		list: ["20_l", "20_r", "20_u", "20_d", "20_b", "20_f"],
	},
];

const VrHouseViewing = () => {
	const [isShowItem, setIsShoeItem] = useState(false);
	const [loadingSpinning, setLoadingSpinning] = useState(true);
	const [boxMaterials, setBoxMaterials]: any = useState([]);
	let threejs: Threejs;

	// 渲染函数
	const render = () => {
		threejs.renderer!.render(threejs.scene as Scene, threejs.camera as Camera);
		threejs.controls && threejs.controls.update();
		requestAnimationFrame(render);
	};

	const loadingModel = (index: number) => {
		boxColor[index].list.forEach((item, itemIndex) => {
			// 纹理加载
			let texture = new THREE.TextureLoader().load(
				`${boxColor[index].imgSrc}${item}.jpg`,
				() => {
					// 创建材质
					if (item.includes("_u") || item.includes("_d")) {
						texture.rotation = Math.PI;
						texture.name = "fj";
						texture.center = new THREE.Vector2(0.5, 0.5);
						// 一个以简单着色（平面或线框）方式来绘制几何体的材质
						boxMaterials[itemIndex] = new THREE.MeshBasicMaterial({
							map: texture,
						});
					} else {
						boxMaterials[itemIndex] = new THREE.MeshBasicMaterial({
							map: texture,
						});
					}
					setLoadingSpinning(false);
				}
			);
		});
		setBoxMaterials(boxMaterials);
	};

	useEffect(() => {
		threejs = new Threejs({
			el: "app",
			isAxesHelper: false,
			orbitControls: true,
		});
		// 设置相机位置
		threejs.camera && (threejs.camera.position.z = 0.1);

		render();

		loadingModel(0);

		const cube = new THREE.Mesh(
			new THREE.BoxGeometry(10, 10, 10), // 添加立方体
			boxMaterials
		);

		cube.geometry.scale(1, 1, -1);
		threejs.scene && threejs.scene.add(cube);
	}, []);

	const clickBoxItem = (index: number) => {
		setIsShoeItem(false);
		setLoadingSpinning(true);
		setTimeout(() => {
			loadingModel(index);
		}, 600);
	};
	return (
		<div>
			<Spin tip='Loading...' spinning={loadingSpinning}>
				<div className='Boxlist'>
					<div
						className='iconDownOutlined'
						onClick={() => setIsShoeItem(!isShowItem)}
					>
						<DownOutlined style={{ fontSize: "16px" }} />
					</div>
					<div className='box' style={{ height: isShowItem ? "140px" : "0px" }}>
						{boxColor.map((item, index) => {
							return (
								<div
									className='boxItem'
									key={index}
									onClick={() => clickBoxItem(index)}
								>
									<span className='box_itme_label'>{item.label}</span>
									<img className='box_logo' src={item.logo} alt={item.label} />
								</div>
							);
						})}
					</div>
				</div>
				<div id='app'></div>
			</Spin>
		</div>
	);
};
export default VrHouseViewing;
