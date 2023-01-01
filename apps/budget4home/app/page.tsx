import { Button } from "ui";

const getPokemon = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export default async function Page() {
  const pokemon = await getPokemon();
  return (
    <div>
      <h1>Hi</h1>
      <p>{JSON.stringify(pokemon)}</p>
      <Button />
    </div>
  );
}
