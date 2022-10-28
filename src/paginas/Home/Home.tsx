import React from 'react';
import './Home.css';

function Home() { /* obrigatorio começar com o nome da nossa primeira função */
    return (
        <>
        <h1 className="titulo"> Home </h1>
        <img src="https://i.imgur.com/3vBvnju.jpeg" alt="Imagem inicial" className="img"/>
        </>
    )
}

export default Home;

//ClassName é usado para quando for criar uma tag, no caso: "titulo" e "img" //