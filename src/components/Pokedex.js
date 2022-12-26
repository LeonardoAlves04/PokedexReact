import React from "react";

const Pokedex = (props) => {
    const { pokemons, loading } = props;
    return (
        <div >
            <div className="pokedex-header">
                <h1>Pokedex</h1>
                <div>Paginação</div>
            </div>
            {loading ? (<div>Carregando, guenta um cado ai...</div>)
                : (<div className="pokedex-grind">
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <div>
                                <div> Nome: {pokemon.name}</div>
                                <img alt={pokemon.name} src={pokemon.url} />
                            </div>
                        );
                    })}
                </div>
                )}
        </div>
    );
};

export default Pokedex;