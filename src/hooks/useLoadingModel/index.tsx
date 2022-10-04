import { useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function useLoadingModel(
	modelUrl: string,
	callback: (gltf: GLTF) => void
) {
	const [loading, setLoading] = useState(false);
	const [loadValue, setLoadValue] = useState(0);
	const [error, setError] = useState(false);

	useEffect(() => {
		// 添加gltf汽车模型
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("/public/draco/gltf/");
		loader.setDRACOLoader(dracoLoader);
		loader.load(
			modelUrl,
			(gltf) => {
				callback(gltf);
			},
			(xhr) => {
				setLoading(true);
				setLoadValue((xhr.loaded / xhr.total) * 100);
			},
			(error: any) => {
				setError(error);
			}
		);
	}, []);

	return { loading, loadValue, error };
}
