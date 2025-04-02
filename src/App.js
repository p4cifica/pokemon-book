import {useEffect, useState} from 'react';
import './App.css';
import {getAllPokemon, getPokemon} from './api/getPokemon'

function App() {
  // データ保持する
  const [pokemonData, setPokemonData] = useState([])

  useEffect(() => {
    // ポケモンのデータ取ってくる処理
    const fetchPokemonData = async() => {
      const res = await getAllPokemon()
      const pokemonData = loadPokemon(res.results)
      setPokemonData(pokemonData)
    }
    fetchPokemonData()
  }, [])
  
  // 全部のデータぶちこんでポケモン単体の詳細データ取ってきてレコードで返すやつ
  const loadPokemon = async (data) => {
    // Promise.all は中でやっている処理全て終わるまで待機する
    const pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(pokemonData)
  }
  console.log(pokemonData)

  // メモ：データをfetchしてきてレコードだけ返すカスタムフックにしたら良い？？

  return (
    <div className="App"></div>
  );
}

export default App;

