
import styles from "./page.module.css";
import Component from "../components/component"
type propProps ={
  hoi: string
}

export default function Home() {
  const props: propProps = {
    hoi: "doei"
  }
  return (
    <main className={styles.main}>
       <div className={styles.getal}>
        <h1>
          23
        </h1> 
       
      </div>
    </main>
  );
}
