// ぶち込まれたエンドポイント叩いてデータ返すだけ
export const dataFetcher = async (endpoint: string) => {
    return new Promise((resolve, reject) => {
      fetch(endpoint).then((res => res.json())).then((data) => {resolve(data)})
    })
  }