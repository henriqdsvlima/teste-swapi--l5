// api.service.ts
import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, Subscription, catchError, distinctUntilChanged, map, shareReplay, throwError } from 'rxjs'

import { environment } from '../environment/environment'
import { Character } from '../responses/character'
import { ApiResponse } from '../responses/api.models'
import { Planets } from '../responses/planets'
import { Species } from '../responses/species'
import { Films } from '../responses/films'
import { Vehicles } from '../responses/vehicles'
import { Starships } from '../responses/starships'

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	// Base URL for the API. Update this as per your API endpoint.
	private baseUrl = environment.apiUrl


	constructor(private http: HttpClient) { }

	// Get one item by ID

	fetchStarwarsCharacters(page?: number): Observable<ApiResponse<Character>> {
		let url = `${this.baseUrl}people/`;
		if (page && page > 0) {
			url += `?page=${page}`;
		}
		return this.http
			.get<ApiResponse<Character>>(url).pipe(distinctUntilChanged())
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error);
					return throwError(error);
				})
			);
	}
	fetchStarWarsCharacterById(id: string | undefined | null): Observable<Character> {
		if (id) {
			return this.http.get<Character>(`${this.baseUrl}people/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}

	fetchStarwarsPlanets(page?: number): Observable<ApiResponse<Planets>> {
		let url = `${this.baseUrl}planets/`
		if (page && page > 0) {
			url += `?page=${page}`
		}

		return this.http
			.get<ApiResponse<Planets>>(url).pipe(distinctUntilChanged())
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error)
					return throwError(error)
				})
			)
	}
	fetchStarWarsPlanetsById(id: string | undefined | null): Observable<Planets> {
		if (id) {
			return this.http.get<Planets>(`${this.baseUrl}planets/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}


	fetchStarwarsSpecies(page?: number): Observable<ApiResponse<Species>> {
		let url = `${this.baseUrl}species/`
		if (page && page > 0) {
			url += `?page=${page}`;
		}
		return this.http
			.get<ApiResponse<Species>>(url).pipe(
				distinctUntilChanged()
			)
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error)
					return throwError(error)
				})
			)
	}

	fetchStarWarsSpeciesById(id: string | undefined | null): Observable<Species> {
		if (id) {
			return this.http.get<Species>(`${this.baseUrl}species/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}
	fetchStarwarsVehicles(page?: number): Observable<ApiResponse<Vehicles>> {
		let url = `${this.baseUrl}vehicles/`
		if (page && page > 0) {
			url += `?page=${page}`;
		}
		return this.http
			.get<ApiResponse<Vehicles>>(url).pipe(
				distinctUntilChanged()
			)
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error)
					return throwError(error)
				})
			)
	}

	fetchStarWarsVehiclesById(id: string | undefined | null): Observable<Vehicles> {
		if (id) {
			return this.http.get<Vehicles>(`${this.baseUrl}vehicles/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}


	fetchStarwarsFilms(page?: number): Observable<ApiResponse<Films>> {
		let url = `${this.baseUrl}films/`
		if (page && page > 0) {
			url += `?page=${page}`;
		}
		return this.http.get<ApiResponse<Films>>(url).pipe(distinctUntilChanged())
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error)
					return throwError(error)
				})
			)
	}

	fetchStarWarsFilmsById(id: string | undefined | null): Observable<Films> {
		if (id) {
			return this.http.get<Films>(`${this.baseUrl}films/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}


	fetchStarwarsStarships(page?: number): Observable<ApiResponse<Starships>> {
		let url = `${this.baseUrl}starships/`
		if (page && page > 0) {
			url += `?page=${page}`;
		}
		return this.http
			.get<ApiResponse<Starships>>(url).pipe(distinctUntilChanged())
			.pipe(
				catchError((error) => {
					console.error('Error fetching page:', error)
					return throwError(error)
				})
			)
	}

	fetchStarWarsStarshipsById(id: string | undefined | null): Observable<Starships> {
		if (id) {
			return this.http.get<Starships>(`${this.baseUrl}starships/${id}/`);
		} else {
			// Trate o caso em que o ID é inválido
			throw new Error('Invalid character ID');
		}
	}
}
