import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/core/responses/character';
import { Films } from 'src/app/core/responses/films';
import { Planets } from 'src/app/core/responses/planets';
import { Starships } from 'src/app/core/responses/starships';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
	selector: 'app-planets-details',
	templateUrl: './planets-details.component.html',
	styleUrls: ['./planets-details.component.scss']
})
export class PlanetsDetailsComponent {
	planet: Planets | undefined;
	films: Films[] = [];
	residents: Character[] = [];
	isLoading = true;
	isLoadingRelatedLinks = true



	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService) {

	}
	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.apiService.fetchStarWarsPlanetsById(id).subscribe((planet) => {
				this.planet = planet;
				if (planet && planet.name) {
					// Aqui garantimos que tanto 'id' quanto 'planet.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForPlanet(planet.name, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(planet);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	loadAdditionalData(planet: Planets) {
		const requests: Observable<any>[] = [];


		// Load films
		planet.films?.forEach(film => {
			requests.push(this.apiService.fetchStarWarsFilmsById(this.extractId(film)));
		});

		// Load residents
		planet.residents?.forEach(resident => {
			requests.push(this.apiService.fetchStarWarsCharacterById(this.extractId(resident)));
		});

		forkJoin(requests).subscribe(results => {
			const filmsCount = planet.films?.length || 0;
			this.films = results.slice(0, filmsCount);
			this.residents = results.slice(filmsCount);
			this.isLoading = false;
			this.isLoadingRelatedLinks = false
		},
			(error) => console.error(error));
	}

	extractId(url: string): string {
		const matches = url.match(/\/(\d+)\/$/);
		return matches ? matches[1] : '';
	}

	goToCharacterDetails(residentUrl?: string) {
		if (!residentUrl) {
			console.error('URL is undefined');
			return;
		}
		const residentId = this.extractId(residentUrl);
		if (residentId) {
			this.router.navigate(['/characters', residentId]);
		} else {
			console.error('Character ID is undefined');
		}
	}
}

