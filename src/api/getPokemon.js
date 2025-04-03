import {dataFetcher} from "../utils/dataFetcher"

// 全取得はEndpoint固定なのでここで持っておく
const getPokemonEndpoint = "https://pokeapi.co/api/v2/pokemon"

// 全部のポケモンの名前を取ってくる関数（エンドポイントは固定でもっておく）
export const getAllPokemon = async () => {
  return dataFetcher(getPokemonEndpoint)
}

// ポケモンのデータを取ってくる関数（エンドポイントは上から貰う）
export const getPokemon = async(endpoint) => {
  return dataFetcher(endpoint)
}