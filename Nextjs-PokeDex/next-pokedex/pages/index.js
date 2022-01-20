import Link from 'next/Link';
import Layout from '../components/Layout';

export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="Header">The Nextjs Pokedex of Kanto and Johto Region Pokemon</h1>
      <div className='Body'>
        <ul>
          {pokemon.map((pokeman, index) => (
            <div className='pokeIndiv'>
              <li key={index}>
                <Link href={`/pokemon?id=${index + 1}`}>
                  <a className="pokeId">
                    <img
                      src={pokeman.image}
                      alt={pokeman.name}
                      className="pokeImg"
                    />
                    <span className="pokeName">
                      {index + 1}.
                    </span>
                    {pokeman.name}
                  </a>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div >
    </Layout >
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251');
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}