export interface PokemonResponse {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: null | Species;
  flavor_text_entries: FlavorTextEntry[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
}

interface Color {
  name: string;
  url: string;
}

interface EggGroup {
  name: string;
  url: string;
}

interface EvolutionChain {
  url: string;
}

interface Species {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

interface Language {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface Genus {
  genus: string;
  language: Language;
}

interface Generation {
  name: string;
  url: string;
}

interface GrowthRate {
  name: string;
  url: string;
}

interface Habitat {
  name: string;
  url: string;
}

interface Name {
  language: Language;
  name: string;
}
