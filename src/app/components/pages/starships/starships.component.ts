import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Starships } from 'src/app/core/interfaces/starships';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-starships',
	templateUrl: './starships.component.html',
	styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent {
	starships: Starships[] = [];
	isLoading!: boolean
	currentPage: number = 2;
	totalPages!: number
	fetchingMoreData: boolean = false;
	hasNextPage: boolean = true;
	isSearchActive: boolean = false;
	hideLoadData: boolean = true



	private subscribeStarships!: Subscription
	private subscribeSearchStarships!: Subscription
	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) { }





	ngOnInit(): void {
		this.isLoading = true;
		this.subscribeStarships = this.apiService.fetchStarwarsStarships().subscribe(response => {
			this.starships = response.results;
			this.isLoading = false;
		});
		this.subscribeSearchStarships = this.onSearch('')
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subscribeStarships) {
			this.subscribeStarships.unsubscribe();
		}
		if (this.subscribeSearchStarships) {
			this.subscribeSearchStarships.unsubscribe()
		}
	}

	goToStarshipsDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/starships', id]);
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
			this.apiService.fetchStarwarsStarships(this.currentPage).subscribe(response => {
				const newStarships = response.results.filter(newStarship =>
					!this.starships.some(existingStarships => JSON.stringify(existingStarships) === JSON.stringify(newStarship)));
				this.starships = [...this.starships, ...newStarships];
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
			this.searchService.search<Starships>('starships', term).subscribe(data => {
				this.starships = data.results;
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
