import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Layout title="NextJs || Poekdex">
      <h1 className="text-4xl mb-8 text-center">NextJs Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray-50 my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokeman.img}
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}{" "}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async (context) => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        img,
      };
    });
    return {
      props: {
        pokemon,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
