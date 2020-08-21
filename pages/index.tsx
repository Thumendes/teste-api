import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Aula consumindo API</title>
      </Head>
      <main>
        <Link href="/weather">
          <a>Clima e Tempo</a>
        </Link>
        <Link href="/news">
          <a>Notícias</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
