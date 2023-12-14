import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Films } from 'src/app/core/interfaces/films';
import { Planets } from 'src/app/core/interfaces/planets';
import { Species } from 'src/app/core/interfaces/species';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
	selector: 'app-species-details',
	templateUrl: './species-details.component.html',
	styleUrls: ['./species-details.component.scss']
})
export class SpeciesDetailsComponent implements OnInit {

	specie: Species | undefined
	characters: Character[] = []
	films: Films[] = []
	homeworld: Planets | undefined;

	isLoading: boolean = true;
	isLoadingRelatedLinks: boolean = true
	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService) {

	}
	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.apiService.fetchStarWarsSpeciesById(id).subscribe((specie) => {
				this.specie = specie;
				if (specie && specie.name) {
					// Aqui garantimos que tanto 'id' quanto 'character.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForSpecies(specie.name, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(specie);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	loadAdditionalData(specie: Species) {
		const requests: Observable<any>[] = [];


		// Load characters
		specie.people?.forEach(people => {
			requests.push(this.apiService.fetchStarWarsCharacterById(this.extractId(people)));
		});

		// Load films
		specie.films?.forEach(film => {
			requests.push(this.apiService.fetchStarWarsFilmsById(this.extractId(film)));
		});


		forkJoin(requests).subscribe(results => {
			this.homeworld = results[0]
			let currentIndex = 0;

			this.characters = results.slice(currentIndex, currentIndex + (specie.people?.length || 0));
			currentIndex += specie.people?.length || 0;

			this.films = results.slice(currentIndex, currentIndex + (specie.films?.length || 0));
			currentIndex += specie.films?.length || 0;

			this.isLoading = false;
			this.isLoadingRelatedLinks = false;
		});
	}


	goToCharacterDetails(characterUrl: string): void {
		if (!characterUrl) null
		const characterId = this.extractId(characterUrl)
		if (characterId) this.router.navigate(['/characters', characterId])
	}

	goToPlanetDetails(homeworldUrl: string): void {
		if (!homeworldUrl) null
		const homeworldId = this.extractId(homeworldUrl)
		if (homeworldId) this.router.navigate(['/planets', homeworldUrl])
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
