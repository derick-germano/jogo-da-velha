"use client";
import {useState, useEffect} from "react";

export default function Home() {
  const quadradoVazio = Array(9).fill("")
  const [quadrado, setQuadrado] = useState(quadradoVazio)
  const [jogadorAtual, setJogadorAtual] = useState("X")
  const [vencedor, setVencedor] = useState(null)
  

  const clickUsuario = (index) => {
    if (vencedor) return null
    if (quadrado[index] !== "") return null

    setQuadrado(quadrado.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item))

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X")
  }

  const ganhador = () => {
    const formasDeGanhar = [
      [quadrado[0], quadrado[1], quadrado[2]],
      [quadrado[3], quadrado[4], quadrado[5]],
      [quadrado[6], quadrado[7], quadrado[8]],

      [quadrado[0], quadrado[3], quadrado[6]],
      [quadrado[1], quadrado[4], quadrado[7]],
      [quadrado[2], quadrado[5], quadrado[8]],

      [quadrado[0], quadrado[4], quadrado[8]],
      [quadrado[2], quadrado[4], quadrado[6]],
    ]
    formasDeGanhar.forEach(itens => {
      if (itens.every(item => item === "O")) setVencedor("O")
      if (itens.every(item => item === "X")) setVencedor("X")
    })
    
    empate()
    
  }

  const empate = () => {
    if (quadrado.every(item => item !== "")) setVencedor("E")
  }

  const resetarJogo = () => {
    setJogadorAtual("O")
    setQuadrado(quadradoVazio)
    setVencedor(null)
  }

  useEffect(ganhador, [quadrado])

  return (
    <>
    <div className="flex flex-col items-center w-screen h-screen bg-slate-200">
      <h1 className="font-black text-center text-4xl m-3">Start Da Velha</h1>
      <div className="relative grid grid-cols-3 grid-rows-3 gap-2 h-5/6 lg:h-5/6 w-11/12 lg:w-8/12 ">
        {quadrado.map((item, index) => (
          <div
            key={index}
            onClick={() => clickUsuario(index)}
            className="grid items-center justify-center bg-white text-5xl rounded">
            {item}
          </div>
        ))}
        {vencedor && 
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            {vencedor === "E" ? 
              <div className="mb-5 text-4xl p-4 rounded-lg bg-slate-700 text-white">
                Empatou!
              </div>
              :
              <div className="mb-5 text-4xl p-4 rounded-lg bg-green-500 text-white">
                "{vencedor}" é vencedor!
              </div>
            }         

            <button
              onClick={resetarJogo}
              className="text-white bg-slate-700 hover:bg-slate-900 font-medium rounded-lg text-2xl px-9 py-3"
            >
              Recomeçar
            </button>
          </div>
        }    
      </div>
    </div>
    </>   
  );
}
