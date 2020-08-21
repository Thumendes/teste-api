import Head from "next/head";
import axios from "axios";
import { useRef, useState } from "react";
import style from "../styles/Weather.module.scss";

const Weather = () => {
  const queryRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(
      `http://api.weatherstack.com/current?access_key=03d926ace6a958d918fd9faea63cf0e6&query=${queryRef.current.value}`
    );
    setData(data);
  };

  return (
    <>
      <Head>
        <title>Clima e tempo</title>
      </Head>
      <div className={style.container}>
        <main className={style.screen}>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={queryRef} />
            <button>Procurar</button>
          </form>
          {data && data.success ? (
            <h1>Não procuramos o pedido!</h1>
          ) : data ? (
            <div className={style.info}>
              <div className={style.name}>
                <h1>{data.location.name}</h1>
                <p>{data.location.country}</p>
                <span>{data.location.localtime}</span>
              </div>
              <div className={style.temperature}>
                <h1>{data.current.temperature}ºC</h1>
                <span>{data.current.weather_descriptions[0]}</span>
              </div>
              <div className={style.otherinfo}>
                <div className={style.item}>
                  <b>Velocidade do Vento:</b>
                  <span>{data.current.wind_speed}km/h</span>
                </div>
                <div className={style.item}>
                  <b>Humidade:</b>
                  <span>{data.current.humidity}%</span>
                </div>
                <div className={style.item}>
                  <b>Precipitação:</b>
                  <span>{data.current.precip}%</span>
                </div>
                <div className={style.item}>
                  <b>Nuvens:</b>
                  <span>{data.current.cloudcover}%</span>
                </div>
              </div>
            </div>
          ) : (
            <h1>Procure por algum lugar</h1>
          )}
        </main>
      </div>
    </>
  );
};

export default Weather;
