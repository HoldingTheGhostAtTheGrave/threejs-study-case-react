import "./index.loading.scss";

const ModelLoading = ({ loadValue }: { loadValue: number }) => {
	return (
		<div className='loading'>
			<progress value={loadValue} max='100'></progress>
			<div>模块加载中...</div>
		</div>
	);
};

export default ModelLoading;
