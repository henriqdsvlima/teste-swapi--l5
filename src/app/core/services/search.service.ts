import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api.models';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private apiUrl = environment.apiUrl
	constructor(private http: HttpClient) { }

	search<T>(category: string, term: string): Observable<ApiResponse<T>> {
		const url = `${this.apiUrl}/${category}/?search=${encodeURIComponent(term)}`;
		return this.http.get<ApiResponse<T>>(url);
	}
}
