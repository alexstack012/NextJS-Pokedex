import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';
import styles from '../styles/indiv.module.css'

export default function pokemon({ pokeman }) {
    return (
        <div className={styles.indivBody}>
            <Layout title={pokeman.name}>
                <h1 className={styles.indivHead}>
                    {pokeman.id}. {pokeman.name.toUpperCase()}
                </h1>
                <img className={styles.indivImg} src={pokeman.image} alt={pokeman.name} />
                <div className={styles.indivInfo}>
                    <p>
                        <span>Weight:</span> {pokeman.weight * .1} kg
                    </p>
                    <p>
                        <span>Height:</span>
                        {" " + pokeman.height * .1} m
                    </p>
                    <div className={styles.indivTypes}>
                        <h2 >Types</h2>
                        {pokeman.types.map((type, index) => (
                            <p key="index">{type.type.name}</p>
                        ))}
                    </div>
                </div>
                <p className="mt-10 text-center">

                    <Link href="/">
                        <a className={styles.homeBTN}>Home</a>
                    </Link>
                </p>
            </Layout>
        </div >
    );
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
        };
    } catch (err) {
        console.error(err);
    }
}