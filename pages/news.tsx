import Head from "next/head";
import { useState, useRef } from "react";
import axios from "axios";
import style from "../styles/Home.module.scss";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const categoryRef = useRef(null);
  const queryRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { data } = await axios.post("/api/news", {
      category: categoryRef.current.value,
      query: queryRef.current.value,
    });

    data && setIsLoading(false);
    setData(data.articles);
  };

  return (
    <>
      <Head>
        <title>Notícias</title>
      </Head>
      <div className={style.container}>
        <header className={style.header}>
          <h1>Pesquise notícias</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <select
                name="category"
                ref={categoryRef}
                placeholder="Categoria..."
              >
                <option value="business">Negócios</option>
                <option value="entertainment">Entretenimento</option>
                <option value="general">Geral</option>
                <option value="health">Saúde</option>
                <option value="science">Ciência</option>
                <option value="sports">Esportes</option>
                <option value="technology">Técnologia</option>
              </select>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="query"
                ref={queryRef}
                placeholder="Pesquisa..."
              />
            </div>
            <div className="input-group">
              <button type="submit">Procurar</button>
            </div>
          </form>
        </header>
        {isLoading && <h1>Carregando...</h1>}
        {data && <h1>{data.length} resultados</h1>}
        <main className={style.main}>
          {data &&
            data.map((value, index) => {
              const date = new Date(value.publishedAt);
              const infoDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
              return (
                <a
                  href={value.url}
                  target="_blank"
                  key={index}
                  className={style.new}
                >
                  <img src={value.urlToImage} alt={value.title} />
                  <div className={style.info}>
                    <h1>{value.title}</h1>
                    <p>{value.description}</p>
                    <b>{infoDate}</b>
                  </div>
                </a>
              );
            })}
        </main>
      </div>
    </>
  );
}
