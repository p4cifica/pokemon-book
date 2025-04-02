

// 全部のポケモンの名前を取ってくる関数（エンドポイントは固定でもっておく）
export const getAllPokemon = async () => {
  const getPokemonEndpoint = "https://pokeapi.co/api/v2/pokemon"
  return new Promise((resolve, reject) => {
    fetch(getPokemonEndpoint).then((res => res.json())).then((data) => {resolve(data)})
  })
}

// 単体取得（ぶち込まれたエンドポイント叩いてデータ返すだけ）
export const getPokemon = async (endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint).then((res => res.json())).then((data) => {resolve(data)})
  })
}