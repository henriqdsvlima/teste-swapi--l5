import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/core/responses/character';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
	characters: Character[] = [];
	constructor(private apiService: ApiService) {

	}



	ngOnInit(): void {
		this.apiService.fetchStarwarsCharacters().subscribe(response => {
			this.characters = response.results;; // Ajuste para a estrutura real da sua resposta da API
			console.log(this.characters);
		});
	}

}
