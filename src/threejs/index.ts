import * as THREE from "three";
import { Scene, Renderer, Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface threeQuery {
	el: string;
	isAxesHelper: boolean;
	orbitControls: boolean;
}

export class Threejs {
	scene: Scene | null = null;
	renderer: Renderer | null = null;
	camera: Camera | null = null;
	isAxesHelper: boolean;
	controls: OrbitControls | null = null;
	el: HTMLElement | null;
	orbitControls = false;
	constructor({ el, isAxesHelper = false, orbitControls = false }: threeQuery) {
		this.isAxesHelper = isAxesHelper;
		this.el = document.getElementById(el);

		this.orbitControls = orbitControls;
		this._init();
	}
	// 初始化
	_init() {
		this.createScene();
		this.createCamera();
		this.createRenderer();
	}
	// 创建场景
	createScene() {
		this.scene = new THREE.Scene();
		// this.scene.background = new THREE.Color(0xcccccc);
		if (this.isAxesHelper) {
			// 添加坐标
			const axesHelper = new THREE.AxesHelper(10);
			this.scene.add(axesHelper);
		}
	}
	// 创建相机
	createCamera() {
		this.camera = new THREE.PerspectiveCamera(
			75,
			(this.el as HTMLDivElement).offsetWidth /
				(this.el as HTMLDivElement).offsetHeight,
			0.1,
			1000
		);
	}
	// 创建渲染器
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
		});
		this.renderer.setSize(
			(this.el as HTMLDivElement).offsetWidth,
			(this.el as HTMLDivElement).offsetHeight
		);
		this.renderer.render(this.scene as Scene, this.camera as Camera);
		// (this.renderer as any).outputEncoding = THREE.sRGBEncoding; // 设置为内光 大型模型内观看适用
		(this.renderer as any).setPixelRatio(window.devicePixelRatio);

		(this.el as HTMLElement).appendChild(this.renderer.domElement);
		this.orbitControls && this.creacteOrbitControls();
	}
	// 添加控制器
	creacteOrbitControls() {
		this.controls = new OrbitControls(
			this.camera as Camera,
			(this.renderer as any).domElement
		);
		this.controls.enableDamping = true;
		this.controls.maxDistance = 9;
		this.controls.update();
	}
	// 加载模型
}
