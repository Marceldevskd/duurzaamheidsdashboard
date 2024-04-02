import styles from '../app/page.module.css';
export default function Home() {
	const callAPI = async () => {
		try {
			const res = await fetch(
				`http://localhost:4000/get-readings`,
				{
					method: 'GET',
					headers: {
						 'Content-Type': 'application/json'
					},
					body: JSON.stringify({ "sensorName":"test1" })
			  }
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
