export interface Hero {
  id: number;
  name: string;
}

export interface PokemonBasicDetails {
  name: string;
  url: string;
}

export interface Pokemons {
  count: number;
  next?: string;
  previous?: string;
  results: Array<PokemonBasicDetails>;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
  };
}

export class SearchCriteria {
  constructor(public name?: string) {}
}
