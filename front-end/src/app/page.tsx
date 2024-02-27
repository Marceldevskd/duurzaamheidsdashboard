import styles from "./page.module.css";
import Component from "../components/component"
type propProps ={
  hoi: string
}
async function joke(){
  const response = await fetch("https://v2.jokeapi.dev/joke/Programming,Dark?type=single");
  let data = await response.json();
  // data = JSON.parse(data)
  return data.joke
}
  

export default function Home() {
  const props: propProps = {
    hoi: "doei"
  }
  
  return (
    <main className={styles.main}>
       <div className={styles.getal}>
        <h1>
          {
            joke()
          }
        </h1> 
       
      </div>
    </main>
  );
}
