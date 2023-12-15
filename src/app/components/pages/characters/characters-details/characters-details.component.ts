import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/components/shared/breadcrumb/breadcrumb.component';
import { Character } from 'src/app/core/interfaces/character';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { Planets } from '../../../../core/interfaces/planets';
import { Films } from 'src/app/core/interfaces/films';
import { Starships } from 'src/app/core/interfaces/starships';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Species } from 'src/app/core/interfaces/species';
import { Vehicles } from 'src/app/core/interfaces/vehicles';
import { StateService } from 'src/app/core/services/state.service';

@Component({
	selector: 'app-characters-details',
	templateUrl: './characters-details.component.html',
	styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {
	character: Character | undefined;
	homeworld: Planets | undefined;
	films: Films[] = [];
	starships: Starships[] = [];
	vehicles: Vehicles[] = []
	species: Species[] = []
	isLoading: boolean = true;
	isLoadingRelatedLinks: boolean = true
	private subscribeFetchStarWarsCharactersById!: Subscription


	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService, private stateService: StateService) {

	}
	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.subscribeFetchStarWarsCharactersById = this.apiService.fetchStarWarsCharacterById(id).subscribe((character) => {
				this.character = character;
				if (character && character.name) {
					// Aqui garantimos que tanto 'id' quanto 'character.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForCharacter(character.name, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(character);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	ngOnDestroy() {
		if (this.subscribeFetchStarWarsCharactersById) {
			this.subscribeFetchStarWarsCharactersById.unsubscribe()
		}
	}

	loadAdditionalData(character: Character) {
		const requests: Observable<any>[] = [];

		// Load homeworld
		if (character.homeworld) {
			requests.push(this.apiService.fetchStarWarsPlanetsById(this.extractId(character.homeworld)));
		}

		// Load films
		character.films?.forEach(film => {
			requests.push(this.apiService.fetchStarWarsFilmsById(this.extractId(film)));
		});

		// Load starships
		character.starships?.forEach(starship => {

			requests.push(this.apiService.fetchStarWarsStarshipsById(this.extractId(starship)));
		});

		character.vehicles?.forEach(vehicle => {

			requests.push(this.apiService.fetchStarWarsVehiclesById(this.extractId(vehicle)));
		});

		character.species?.forEach(specie => {

			requests.push(this.apiService.fetchStarWarsSpeciesById(this.extractId(specie)));
		});

		forkJoin(requests).subscribe(results => {
			this.homeworld = results[0];
			let currentIndex = 0
			this.films = results.slice(currentIndex, currentIndex + (character.films?.length || 0));
			currentIndex += character.films?.length || 0; // Atualiza o currentIndex

			this.starships = results.slice(currentIndex, currentIndex + (character.starships?.length || 0));
			currentIndex += character.starships?.length || 0; // Atualiza o currentIndex

			this.vehicles = results.slice(currentIndex, currentIndex + (character.vehicles?.length || 0));
			currentIndex += character.vehicles?.length || 0; // Atualiza o currentIndex

			this.species = results.slice(currentIndex, currentIndex + (character.species?.length || 0));
			this.isLoading = false;
			this.isLoadingRelatedLinks = false
			this.stateService.updateRelatedLinks({
				films: this.films
			})
		});
	}

	goToPlanetDetails(planetUrl: string): void {
		if (!planetUrl) {
			console.error('Planet URL is undefined');
			return;
		}

		const planetId = this.extractId(planetUrl);
		if (planetId) {
			this.router.navigate(['/planets', planetId]);
		}
	}

	goToFilmDetails(filmUrl: string) {
		if (!filmUrl) {
			console.error('Planet URL is undefined');
			return;
		}

		const filmId = this.extractId(filmUrl);
		if (filmId) {
			this.router.navigate(['/films', filmId]);
		}
	}

	goToStarshipDetails(starshipUrl: string) {
		if (!starshipUrl) {
			console.error('Planet URL is undefined');
			return;
		}

		const starshipId = this.extractId(starshipUrl);
		if (starshipId) {
			this.router.navigate(['/starships', starshipId]);
		}
	}

	goToVehicleDetails(vehicleUrl: string) {
		if (!vehicleUrl) {
			console.error('Planet URL is undefined');
			return;
		}

		const vehicleId = this.extractId(vehicleUrl);
		if (vehicleId) {
			this.router.navigate(['/vehicles', vehicleId]);
		}
	}

	goToSpeciesDetails(specieUrl: string) {
		if (!specieUrl) {
			return alert('não existe')

		}

		const specieId = this.extractId(specieUrl)
		if (specieId) {
			this.router.navigate(['/species', specieId])
		}
	}

	extractId(url: string | null | undefined): string | null {
		if (!url) return null;
		const idPattern = /\/(\d+)\/$/;
		const match = url.match(idPattern);
		return match ? match[1] : null;
	}



}

