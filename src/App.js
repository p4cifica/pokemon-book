import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./api/getPokemon";
import Card from "./components/Card/Card";
import NavigationBar from "./components/NavigationBar/NavigationBar";

/**
 * TODOリスト
 * - データの端っこにいるときも前or次のページに飛ぼうとしてエラーになる
 * - ローディング中の表示
 * - カードも触ったらホバーしてほしい
 * - 画面上下両方にボタン配置
 * - 日本語化
 * - TypeScriptで書き直す
 * - （必要なら）フッター追加
 */
function App() {
  // 表示するポケモンのデータ
  const [pokemonData, setPokemonData] = useState([]);
  // 次の頁のデータ
  const [nextURL, setNextURL] = useState("");
  // 前の頁のデータ
  const [previousURL, setPreviousURL] = useState("");

  // 初回レンダリング
  useEffect(() => {
    // ポケモンのデータ取ってくる処理
    const fetchPokemonData = async () => {
      const res = await getAllPokemon();
      const pokemonData = loadPokemon(res.results);
      setPokemonData(pokemonData);
      setNextURL(res.next);
      setPreviousURL(res.previous);
    };
    fetchPokemonData();
  }, []);

  // 全部のデータぶちこんでポケモン単体の詳細データ取ってきてレコードで返すやつ
  const loadPokemon = async (data) => {
    // Promise.all は中でやっている処理全て終わるまで待機する
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // useStateに取ってきたデータ入れる
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);

  // 次のページに飛ぶ処理
  const handleNextPage = async () => {
    let res = await getPokemon(nextURL);
    loadPokemon(res.results);
    setNextURL(res.next);
    setPreviousURL(res.previous);
  };

  // 前のページに飛ぶ処理
  const handlePreviousPage = async () => {
    let res = await getPokemon(previousURL);
    loadPokemon(res.results);
    setPreviousURL(res.previous);
    setNextURL(res.next);
  };

  return (
    <>
      <NavigationBar />
      <div className="btn">
        <button onClick={handlePreviousPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
      </div>
      <div className="App">
        <div className="pokemonCardContainer">
          {pokemonData.length > 0 ? (
            pokemonData.map((pokemon, i) => <Card key={i} pokemon={pokemon} />)
          ) : (
            <p>No Pokémon found.</p>
          )}
        </div>
      </div>
      
    </>
  );
}

export default App;
