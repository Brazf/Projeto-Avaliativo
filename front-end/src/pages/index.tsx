import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [endereco, setEndereco] = useState({});

  function manipularCep(event) {

    const cep = event.target.value

    if (cep && cep.length === 8) {
      //função para obter endereco
      fetch(`https://viacep.com.br/ws/${cep}/json/`).
      then(resposta => resposta.json()).
      then(dados => {
        setEndereco({
            cep: dados.cep,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf,
            ibge: dados.ibge,
        })
      });
    }
  }

  return (
    <header className="flex flex-col items-center gap-3">
      <input
        placeholder="Digite o CEP"
        className="border-solid border-2 border-sky-500"
        onChange={manipularCep}
      />
      <ul className="font-bold">
        <li>CEP: {endereco.cep}</li>
        <li>Logradouro: {endereco.logradouro}</li>
        <li>Bairro: {endereco.bairro}</li>
        <li>Localidade: {endereco.localidade}</li>
        <li>UF: {endereco.uf}</li>
        <li>IBGE: {endereco.ibge}</li>
      </ul>
    </header>
  );
}
