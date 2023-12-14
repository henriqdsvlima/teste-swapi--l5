import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Species } from 'src/app/core/interfaces/species';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-species',
	templateUrl: './species.component.html',
	styleUrls: ['./species.component.scss']
})
export class SpeciesComponent {

	species: Species[] = [];
	isLoading!: boolean
	currentPage: number = 2;
	totalPages!: number
	fetchingMoreData: boolean = false;
	hasNextPage: boolean = true;
	hideLoadData: boolean = true
	isSearchActive: boolean = false;



	private subscribeSpecies!: Subscription
	private subscribeSearchSpecies!: Subscription
	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) { }





	ngOnInit(): void {
		this.isLoading = true;
		this.subscribeSpecies = this.apiService.fetchStarwarsSpecies().subscribe(response => {
			this.species = response.results;
			this.isLoading = false;
		});
		this.subscribeSearchSpecies = this.onSearch('')
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subscribeSpecies) {
			this.subscribeSpecies.unsubscribe();
		}
		if (this.subscribeSearchSpecies) {
			this.subscribeSearchSpecies.unsubscribe()
		}
	}

	goToSpeciesDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/species', id]);
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
			this.apiService.fetchStarwarsSpecies(this.currentPage).subscribe(response => {
				const newSpecies = response.results.filter(newSpecie =>
					!this.species.some(existingSpecies => JSON.stringify(existingSpecies) === JSON.stringify(newSpecie)));
				this.species = [...this.species, ...newSpecies];
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
			this.searchService.search<Species>('people', term).subscribe(data => {
				this.species = data.results;
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
