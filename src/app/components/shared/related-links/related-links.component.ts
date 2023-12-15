import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/core/interfaces/character';
import { Films } from 'src/app/core/interfaces/films';
import { Planets } from 'src/app/core/interfaces/planets';
import { Species } from 'src/app/core/interfaces/species';
import { Starships } from 'src/app/core/interfaces/starships';
import { Vehicles } from 'src/app/core/interfaces/vehicles';

@Component({
	selector: 'app-related-links',
	templateUrl: './related-links.component.html',
	styleUrls: ['./related-links.component.scss']
})
export class RelatedLinksComponent {

	@Input() films: Films[] = [];
	@Input() starships: Starships[] = [];
	@Input() planets: Planets[] = []
	@Input() species: Species[] = []
	@Input() vehicles: Vehicles[] = []
	@Input() people: Character[] = []
	@Input() pilots: Character[] = []
	@Input() character: Character[] = []

	@Output() navigateToDetail = new EventEmitter<string>();

	onNavigateToDetail(url: string | undefined) {
		this.navigateToDetail.emit(url)
	}
}
