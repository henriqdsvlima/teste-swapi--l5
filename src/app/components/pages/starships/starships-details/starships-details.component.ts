import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Films } from 'src/app/core/interfaces/films';
import { Starships } from 'src/app/core/interfaces/starships';
import { ApiService } from 'src/app/core/services/api.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';


@Component({
	selector: 'app-starships-details',
	templateUrl: './starships-details.component.html',
	styleUrls: ['./starships-details.component.scss']
})
export class StarshipsDetailsComponent implements OnInit {
	starship: Starships | undefined
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
			this.apiService.fetchStarWarsStarshipsById(id).subscribe((starship) => {
				this.starship = starship;
				if (starship && starship.name) {
					// Aqui garantimos que tanto 'id' quanto 'character.name' não sejam undefined
					this.breadCrumbService.updateBreadcrumbForStarships(starship.name, id);
				}
				this.isLoading = false;
				this.loadAdditionalData(starship);
			});
		} else {
			console.error('No character ID found in route');
			// Tratar a situação em que o ID não está disponível
		}
	}

	loadAdditionalData(starship: Starships) {
		const requests: Observable<any>[] = [];

		// Load characters
		starship.pilots?.forEach(pilot => {
			requests.push(this.apiService.fetchStarWarsCharacterById(this.extractId(pilot)));
		});

		// Load films
		starship.films?.forEach(film => {
			requests.push(this.apiService.fetchStarWarsFilmsById(this.extractId(film)));
		});


		forkJoin(requests).subscribe(results => {
			let currentIndex = 0;

			this.pilots = results.slice(currentIndex, currentIndex + (starship.pilots?.length || 0));
			currentIndex += starship.pilots?.length || 0;

			this.films = results.slice(currentIndex, currentIndex + (starship.films?.length || 0));
			currentIndex += starship.films?.length || 0;

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
