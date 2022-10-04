import { Threejs } from "@/threejs";
import { useCallback, useEffect } from "react";
import { Scene, Camera, Renderer } from "three";
import * as THREE from "three";
import useLoadingModel from "@/hooks/useLoadingModel/index";
import ModelLoading from "@/components/ModelLoading";

//创建材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.5,
	clearcoat: 1,
	clearcoatRoughness: 0,
});

const wheelsMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xff0000,
	metalness: 1,
	roughness: 0.1,
});
// 玻璃材质
const glassMaterial = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	metalness: 0,
	roughness: 0,
	transmission: 1,
	transparent: true,
});

const Index = () => {
	let wheels: any = [];
	let threejs: any = null;
	const { loading, loadValue } = useLoadingModel(
		"https://threejs.org/examples/models/gltf/ferrari.glb",
		(gltf) => {
			const carModel: any = gltf.scene;
			wheels.push(
				carModel.children[0].getObjectByName("wheel_fl"),
				carModel.children[0].getObjectByName("wheel_fr"),
				carModel.children[0].getObjectByName("wheel_rl"),
				carModel.children[0].getObjectByName("wheel_rr")
			);
			// 判断是否是车身
			carModel.getObjectByName("body").material = bodyMaterial;
			// 玻璃
			carModel.getObjectByName("glass").material = glassMaterial;
			// 车轮毂
			carModel.getObjectByName("rim_fl").material = wheelsMaterial;
			carModel.getObjectByName("rim_fr").material = wheelsMaterial;
			carModel.getObjectByName("rim_rr").material = wheelsMaterial;
			carModel.getObjectByName("rim_rl").material = wheelsMaterial;

			carModel.rotation.y = -Math.PI / 0.8;
			threejs.scene.add(carModel);
		}
	);
	useCallback(() => {
		console.log(loading, loadValue);
	}, [loading, loadValue])();

	// 添加网格
	const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
	(grid.material as any).opacity = 0.2;
	(grid.material as any).depthWrite = false;
	(grid.material as any).transparent = true;

	// 渲染函数
	const render = () => {
		threejs.renderer!.render(threejs.scene as Scene, threejs.camera as Camera);
		// 设置网格移动效果
		const time = -performance.now() / 1000;
		grid.position.z = -time % 1;

		for (let i = 0; i < wheels.length; i++) {
			wheels[i].rotation.x = time * Math.PI * 2;
		}

		threejs.controls && threejs.controls.update();
		requestAnimationFrame(render);
	};

	useEffect(() => {
		threejs = new Threejs({
			el: "app",
			isAxesHelper: false,
			orbitControls: true,
		});
		threejs.camera.position.set(-4, 2, 1);
		threejs.scene.background = new THREE.Color(0x333333);

		render();

		(threejs.scene as Scene).add(grid);

		// 添加灯光
		const light1 = new THREE.DirectionalLight(0xffffff, 1);
		light1.position.set(0, 0, 10);
		threejs.scene.add(light1);
		const light2 = new THREE.DirectionalLight(0xffffff, 1);
		light2.position.set(0, 0, -10);
		threejs.scene.add(light2);
		const light3 = new THREE.DirectionalLight(0xffffff, 1);		
		light3.position.set(10, 0, 0);
		threejs.scene.add(light3);
		const light4 = new THREE.DirectionalLight(0xffffff, 1);
		light4.position.set(-10, 0, 0);
		threejs.scene.add(light4);
		const light5 = new THREE.DirectionalLight(0xffffff, 1);
		light5.position.set(0, 10, 0);
		threejs.scene.add(light5);
		const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
		light6.position.set(5, 10, 0);
		threejs.scene.add(light6);
		const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
		light7.position.set(0, 10, 5);
		threejs.scene.add(light7);
		const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
		light8.position.set(0, 10, -5);
		threejs.scene.add(light8);
		const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
		light9.position.set(-5, 10, 0);
		threejs.scene.add(light9);

		return () => {
			threejs = null;
			wheels = null;
		};
	}, []);

	return (
		<div>
			{/* 加载 */}
			<div style={{ display: loadValue >= 100 ? "none" : "black" }}>
				<ModelLoading loadValue={loadValue} />
			</div>
			<div id='app'></div>
		</div>
	);
};
export default Index;
