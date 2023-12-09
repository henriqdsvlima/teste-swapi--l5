// api.service.ts
import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs'

import { environment } from '../environment/environment'
import { Character } from '../responses/character'
import { ApiListResponse, ApiResponse } from '../responses/api.models'


@Injectable({
	providedIn: 'root'
})
export class ApiService {
	// Base URL for the API. Update this as per your API endpoint.
	private baseUrl = environment.apiUrl

	constructor(private http: HttpClient) { }

	// Get one item by ID


	fetchStarwarsCharacters(): Observable<ApiResponse<Character>> {
		return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/people/`);
	}
	fetchStarwarsPlanets() { }
	fetchStarwarsSpecies() { }
	fetchStarwarsVehicles() { }
	fetchStarwarsMovies() { }
	fetchStarwarsSpaceships() { }

}
