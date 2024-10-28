import { fetcher } from "../../_utils/fetcher";
import { PokemonResponse } from "../_types/PokemonResponse";
export const pokeApi = async () => {
  //10回以内に名前取得に成功しないとエラーをスローする
  let count = 0;
  const MAX_TRY = 10;

  while (count < MAX_TRY) {
    //1-1025の数字生成する
    const id = Math.floor(Math.random() * 1025) + 1;
    const endpoint = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    try {
      const resp = await fetcher<PokemonResponse>(endpoint);
      const name = resp.names.find(item => item.language.name === "ja-Hrkt");

      if (name) {
        return name.name;
      }
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
    } finally {
      count++;
    }
  }
  throw new Error("合言葉の生成に失敗しました");
};
