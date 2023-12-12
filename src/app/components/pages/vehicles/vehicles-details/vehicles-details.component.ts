import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/core/responses/character';
import { Films } from 'src/app/core/responses/films';
import { Starships } from 'src/app/core/responses/starships';
import { Vehicles } from 'src/app/core/responses/vehicles';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
	selector: 'app-vehicles-details',
	templateUrl: './vehicles-details.component.html',
	styleUrls: ['./vehicles-details.component.scss']
})
export class VehiclesDetailsComponent {
	vehicles: Vehicles | undefined
	pilots: Character[] = []
	films: Films[] = []
	isLoading: boolean = true;
	isLoadingRelatedLinks: boolean = true

	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService) {

	}
	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.apiService.fetchStarWarsVehiclesById(id).subscribe((vehicle) => {
				this.vehicles = vehicle;
				if (vehicle && vehicle.name) {
					// Aqui garantimos que tanto 'id' quanto 'character.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForVehicles(vehicle.name, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(vehicle);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	loadAdditionalData(vehicle: Vehicles) {
		const requests: Observable<any>[] = [];

		// Load characters
		vehicle.pilots?.forEach(pilot => {
			requests.push(this.apiService.fetchStarWarsCharacterById(this.extractId(pilot)));
		});

		// Load films
		vehicle.films?.forEach(film => {
			requests.push(this.apiService.fetchStarWarsFilmsById(this.extractId(film)));
		});


		forkJoin(requests).subscribe(results => {
			let currentIndex = 0;

			this.pilots = results.slice(currentIndex, currentIndex + (vehicle.pilots?.length || 0));
			currentIndex += vehicle.pilots?.length || 0;

			this.films = results.slice(currentIndex, currentIndex + (vehicle.films?.length || 0));
			currentIndex += vehicle.films?.length || 0;

			this.isLoading = false;
			this.isLoadingRelatedLinks = false;
		});
	}

	goToCharacterDetails(characterUrl: string): void {
		if (!characterUrl) null
		const characterId = this.extractId(characterUrl)
		if (characterId) this.router.navigate(['/characters', characterId])
	}

	goToFilmsDetails(characterUrl: string): void {
		if (!characterUrl) null
		const characterId = this.extractId(characterUrl)
		if (characterId) this.router.navigate(['/characters', characterId])
	}

	extractId(url: string): string {
		const matches = url.match(/\/(\d+)\/$/);
		return matches ? matches[1] : '';
	}
}
