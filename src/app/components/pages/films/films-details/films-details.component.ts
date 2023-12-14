import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Films } from 'src/app/core/interfaces/films';
import { Planets } from 'src/app/core/interfaces/planets';
import { Species } from 'src/app/core/interfaces/species';
import { Starships } from 'src/app/core/interfaces/starships';
import { Vehicles } from 'src/app/core/interfaces/vehicles';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
	selector: 'app-films-details',
	templateUrl: './films-details.component.html',
	styleUrls: ['./films-details.component.scss']
})
export class FilmsDetailsComponent implements OnInit {

	film: Films | undefined
	characters: Character[] = []
	planets: Planets[] = []
	starships: Starships[] = []
	vehicles: Vehicles[] = []
	species: Species[] = []
	isLoading: boolean = true;
	isLoadingRelatedLinks: boolean = true

	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService) {

	}


	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.apiService.fetchStarWarsFilmsById(id).subscribe((film) => {
				this.film = film;
				if (film && film.title) {
					// Aqui garantimos que tanto 'id' quanto 'character.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForFilm(film.title, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(film);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	loadAdditionalData(film: Films) {
		const requests: Observable<any>[] = [];

		// Load characters
		film.characters?.forEach(character => {
			requests.push(this.apiService.fetchStarWarsCharacterById(this.extractId(character)));
		});

		// Load planets
		film.planets?.forEach(planet => {
			requests.push(this.apiService.fetchStarWarsPlanetsById(this.extractId(planet)));
		});

		// Load starships
		film.starships?.forEach(starship => {
			requests.push(this.apiService.fetchStarWarsStarshipsById(this.extractId(starship)));
		});

		// Load vehicles
		film.vehicles?.forEach(vehicle => {
			requests.push(this.apiService.fetchStarWarsVehiclesById(this.extractId(vehicle)));
		});

		// Load species
		film.species?.forEach(specie => {
			requests.push(this.apiService.fetchStarWarsSpeciesById(this.extractId(specie)));
		});

		forkJoin(requests).subscribe(results => {
			let currentIndex = 0;

			this.characters = results.slice(currentIndex, currentIndex + (film.characters?.length || 0));
			currentIndex += film.characters?.length || 0;

			this.planets = results.slice(currentIndex, currentIndex + (film.planets?.length || 0));
			currentIndex += film.planets?.length || 0;

			this.starships = results.slice(currentIndex, currentIndex + (film.starships?.length || 0));
			currentIndex += film.starships?.length || 0;

			this.vehicles = results.slice(currentIndex, currentIndex + (film.vehicles?.length || 0));
			currentIndex += film.vehicles?.length || 0;

			this.species = results.slice(currentIndex, currentIndex + (film.species?.length || 0));

			this.isLoading = false;
			this.isLoadingRelatedLinks = false;
		});
	}

	goToCharacterDetails(characterUrl: string): void {
		if (!characterUrl) null
		const characterId = this.extractId(characterUrl)
		if (characterId) this.router.navigate(['/characters', characterId])
	}
	goToPlanetDetails(planetUrl: string): void {
		if (!planetUrl) null
		const planetId = this.extractId(planetUrl)
		if (planetId) this.router.navigate(['/planets', planetId])
	}
	goToStarshipsDetails(starshipUrl: string): void {
		if (!starshipUrl) null
		const starshipId = this.extractId(starshipUrl)
		if (starshipId) this.router.navigate(['/starships', starshipId])
	}
	goToVehiclesDetails(vehicleUrl: string): void {
		if (!vehicleUrl) null
		const vehicleId = this.extractId(vehicleUrl)
		if (vehicleId) this.router.navigate(['/vehicles', vehicleId])
	}

	goToSpeciesDetails(specieUrl: string): void {
		if (!specieUrl) null
		const specieId = this.extractId(specieUrl)
		if (specieId) this.router.navigate(['/species', specieId])
	}


	extractId(url: string): string {
		const matches = url.match(/\/(\d+)\/$/);
		return matches ? matches[1] : '';
	}

}
