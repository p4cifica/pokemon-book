import {dataFetcher} from './dataFetcher';
import {types} from './constant';

// ポケモンごとの詳細なURLを渡して日本語名を返す
export const nameTranslater = async (pokemon: any) => {
    const detailURL: string = pokemon.species.url
    const response: any = await dataFetcher(detailURL)
    return response.names.find((name: {language: {name: string}}) => name.language.name === 'ja').name
}

// 英語のタイプを受け取って日本語名にして返す（変換できなければそのまま返す）
export const typeTranslater = (type: string) => {
    try {
        return types[type] || type;
    } catch {
        return type
    }
}

