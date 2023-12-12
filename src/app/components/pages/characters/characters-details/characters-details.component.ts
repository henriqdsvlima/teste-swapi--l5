import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/components/shared/breadcrumb/breadcrumb.component';
import { Character } from 'src/app/core/responses/character';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { Planets } from '../../../../core/responses/planets';
import { Films } from 'src/app/core/responses/films';
import { Starships } from 'src/app/core/responses/starships';
import { Observable, Subscription, forkJoin } from 'rxjs';

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
	isLoading: boolean = true;
	isLoadingRelatedLinks: boolean = true
	private subscribeFetchStarWarsCharactersById!: Subscription


	constructor(private route: ActivatedRoute,
		private apiService: ApiService, private router: Router, private breadCrumbService: BreadcrumbService) {

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

		forkJoin(requests).subscribe(results => {
			this.homeworld = results[0];
			const filmsCount = character.films?.length || 0;
			this.films = results.slice(1, 1 + filmsCount);
			this.starships = results.slice(1 + filmsCount);
			this.isLoading = false;
			this.isLoadingRelatedLinks = false
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

	goToFilmDetails(id: string | null) {
		if (id) {
			this.router.navigate([this.films, id])
		}
	}

	goToStarshipDetails(id: string | null) {
		if (id) {
			this.router.navigate([this.starships, id])
		}
	}

	extractId(url: string | null | undefined): string | null {
		if (!url) return null;
		const idPattern = /\/(\d+)\/$/;
		const match = url.match(idPattern);
		return match ? match[1] : null;
	}



}

