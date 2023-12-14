import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Films } from 'src/app/core/interfaces/films';
import { Planets } from 'src/app/core/interfaces/planets';
import { Species } from 'src/app/core/interfaces/species';
import { Starships } from 'src/app/core/interfaces/starships';
import { Vehicles } from 'src/app/core/interfaces/vehicles';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-films',
	templateUrl: './films.component.html',
	styleUrls: ['./films.component.scss']
})
export class FilmsComponent {
	films: Films[] = []
	isLoading!: boolean
	currentPage: number = 2;
	totalPages!: number
	fetchingMoreData: boolean = false;
	hasNextPage: boolean = true;
	isSearchActive: boolean = false;
	hideLoadData: boolean = true;


	private subscribeFilms!: Subscription
	private subscribeSearchFilms!: Subscription

	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) { }





	ngOnInit(): void {
		this.isLoading = true;
		this.subscribeFilms = this.apiService.fetchStarwarsFilms().subscribe(response => {
			this.films = response.results;
			this.isLoading = false;
		});
		this.subscribeSearchFilms = this.onSearch('')
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subscribeFilms) {
			this.subscribeFilms.unsubscribe();
		}
		if (this.subscribeSearchFilms) {
			this.subscribeSearchFilms.unsubscribe()
		}
	}

	goToFilmsDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/films', id]);
		} else {
			console.error('Character ID is undefined');
			// Trate o caso em que id é undefined, como mostrar uma mensagem de erro
		}
	}


	extractId(url: string | null | undefined): string | null {
		if (!url) return null;

		const idPattern = /\/(\d+)\/$/;
		const match = url.match(idPattern);
		return match ? match[1] : null;
	}

	loadMoreData() {
		if (this.hasNextPage && !this.fetchingMoreData) {
			this.fetchingMoreData = true;
			this.apiService.fetchStarwarsFilms(this.currentPage).subscribe(response => {
				const newFilms = response.results.filter(newFilms =>
					!this.films.some(existingFilms => JSON.stringify(existingFilms) === JSON.stringify(newFilms)));
				this.films = [...this.films, ...newFilms];
				this.fetchingMoreData = false;
				this.hasNextPage = response.next != null;
				if (this.hasNextPage) {
					this.currentPage++;
				}
			}, error => {
				console.error('Error fetching data: ', error);
				this.fetchingMoreData = false;
			});
		}
	}

	onSearch(term: string): any {
		this.isLoading = true;
		if (term) {
			this.isSearchActive = true
			this.searchService.search<Films>('people', term).subscribe(data => {
				this.films = data.results;
				this.isLoading = false;

			}, error => {
				// Trate os erros aqui
				this.isLoading = false;
			});
		} else {
			this.isSearchActive = false
		}
	}
}
