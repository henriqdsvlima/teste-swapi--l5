import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicles } from 'src/app/core/interfaces/vehicles';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-vehicles',
	templateUrl: './vehicles.component.html',
	styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
	vehicles: Vehicles[] = [];
	isLoading!: boolean
	currentPage: number = 2;
	totalPages!: number
	fetchingMoreData: boolean = false;
	hasNextPage: boolean = true;
	isSearchActive: boolean = false;
	hideLoadData: boolean = true



	private subscribeVehicles!: Subscription
	private subscribeSearchVehicles!: Subscription
	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) { }





	ngOnInit(): void {
		this.isLoading = true;
		this.subscribeVehicles = this.apiService.fetchStarwarsVehicles().subscribe(response => {
			this.vehicles = response.results;
			this.isLoading = false;
		});
		this.subscribeSearchVehicles = this.onSearch('')
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subscribeVehicles) {
			this.subscribeVehicles.unsubscribe();
		}
		if (this.subscribeSearchVehicles) {
			this.subscribeSearchVehicles.unsubscribe()
		}
	}

	goToVehiclesDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/vehicles', id]);
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
			this.apiService.fetchStarwarsVehicles(this.currentPage).subscribe(response => {
				const newVehicles = response.results.filter(newVehicles =>
					!this.vehicles.some(existingVehicles => JSON.stringify(existingVehicles) === JSON.stringify(newVehicles)));
				this.vehicles = [...this.vehicles, ...newVehicles];
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
			this.searchService.search<Vehicles>('people', term).subscribe(data => {
				this.vehicles = data.results;
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
