import {dataFetcher} from "./dataFetcher";
import {types} from "./constant";

// ポケモンごとの詳細なURLを渡して日本語名を返す
export const nameTranslater = async (pokemon) => {
    let detailURL = pokemon.species.url
    let response = await dataFetcher(detailURL)
    return response.names.find(name => name.language.name === "ja").name
};

export const typeTranslater = (type) => {
    try {
        return types[type] || type;
    } catch {
        return type
    }
}

