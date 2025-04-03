import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./api/getPokemon";
import Card from "./components/Card/Card";
import NavigationBar from "./components/NavigationBar/NavigationBar";

/**
 * TODOリスト
 * - 日本語化
 *   - 以下の処理をまとめたデータの取得だけをする関数を用意して、Appはそれを使って描画するだけにしたい
 *     - 最初にがばっとフェッチしてくる
 *     - 必要な情報だけを持ったpokemonData型を定義しておいて、それに必要な情報だけに成形する
 *     - ↑の過程で日本語に置き換える
 *     - 最終的には、pokemonData型のデータを２０件もったオブジェクトにして描画に渡す
 * - 画面上下両方にボタン配置
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
  // ロード中かどうかの状態
  const [isLoading, setLoading] = useState(true);

  // 初回レンダリング
  useEffect(() => {
    // ポケモンのデータ取ってくる処理
    const initPage = async () => {
      const res = await getAllPokemon();
      loadPokemon(res.results);
      setNextURL(res.next);
      setPreviousURL(res.previous);
    };
    initPage();
  }, []);

  // 全部のデータぶちこんでポケモン単体の詳細データ取ってきてレコードで返すやつ
  const loadPokemon = async (data) => {
    setLoading(true)
    // Promise.all は中でやっている処理全て終わるまで待機する
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // useStateに取ってきたデータ入れる
    setPokemonData(_pokemonData);
    console.log(_pokemonData)
    setLoading(false)
  };

  // 次のページに飛ぶ処理
  const handleNextPage = async () => {
    if(nextURL){
      const res = await getPokemon(nextURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPreviousURL(res.previous)
    }
  };

  // 前のページに飛ぶ処理
  const handlePreviousPage = async () => {
    if(previousURL){
      const res = await getPokemon(previousURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setPreviousURL(res.previous);
    }
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
          {isLoading ? (
            <p>Now Loading...</p>
          ) : pokemonData.length > 0 ? (
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
