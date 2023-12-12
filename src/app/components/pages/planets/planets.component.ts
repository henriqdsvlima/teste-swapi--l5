import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Planets } from 'src/app/core/responses/planets';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-planets',
	templateUrl: './planets.component.html',
	styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

	planets: Planets[] = []
	isLoading!: boolean
	isSearchActive: boolean = true
	currentPage: number = 2
	totalPages!: number
	fetchingMoreData: boolean = false
	hasNextPage: boolean = true

	private subScribePlanets!: Subscription
	private subScribeSearchPlanets!: Subscription
	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) {

	}

	ngOnInit(): void {
		this.isLoading = true;
		this.subScribePlanets = this.apiService.fetchStarwarsPlanets().subscribe(response => {
			this.planets = response.results;
			this.isLoading = false;
			this.loadMoreData()
		});
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subScribePlanets) {
			this.subScribePlanets.unsubscribe();
		}
		if (this.subScribeSearchPlanets) {
			this.subScribeSearchPlanets.unsubscribe()
		}
	}

	goToPlanetDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/planets', id]);
		} else {
			console.error('Planet ID is undefined');
			// Trate o caso em que id é undefined, como mostrar uma mensagem de erro
		}
	}



	loadMoreData() {
		if (this.hasNextPage && !this.fetchingMoreData) {
			this.fetchingMoreData = true;
			this.apiService.fetchStarwarsPlanets(this.currentPage).subscribe(response => {
				const newPlanets = response.results.filter(newPlanet =>
					!this.planets.some(existingPlanet => JSON.stringify(existingPlanet) === JSON.stringify(newPlanet)));
				this.planets = [...this.planets, ...newPlanets];
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
			this.searchService.search<Planets>('planets', term).subscribe(data => {
				this.planets = data.results;
				this.isLoading = false;

			}, error => {
				// Trate os erros aqui
				this.isLoading = false;
			});
		} else {
			this.isSearchActive = false
		}
	}
	extractId(url: string | null | undefined): string | null {
		if (!url) return null;

		const idPattern = /\/(\d+)\/$/;
		const match = url.match(idPattern);
		return match ? match[1] : null;
	}
}
