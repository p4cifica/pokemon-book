import {dataFetcher} from "./dataFetcher";
import {types} from "./constant";

// ポケモンごとの詳細なURLを渡して日本語名を返す
export const nameTranslater = async (pokemon) => {
    let detailURL = pokemon.species.url
    let response = await dataFetcher(detailURL)
    return response.names.find(name => name.language.name === "ja").name
};

// 英語のタイプを受け取って日本語名にして返す（変換できなければそのまま返す）
export const typeTranslater = (type) => {
    try {
        return types[type] || type;
    } catch {
        return type
    }
}

