import styles from '../app/page.module.css';
export default function Home() {
	const callAPI = async () => {
		try {
			const res = await fetch(
				`http://localhost:3001/get-readings`
			);
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<button onClick={callAPI()}>Make API Call</button>
			</main>
		</div>
	);
}