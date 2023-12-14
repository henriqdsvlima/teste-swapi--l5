import { Character } from "./character"

export interface IPlanets {
	name: string
	rotation_period: string
	orbital_period: string
	diameter: string
	climate: string
	gravity: string
	terrain: string
	surface_water: string
	population: string
	residents: string[] | undefined
	films: string[] | undefined
	url?: string
}

export type Planets = Partial<IPlanets>
