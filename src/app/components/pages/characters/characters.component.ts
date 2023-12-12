import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/core/responses/character';
import { ApiService } from 'src/app/core/services/api.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
	characters: Character[] = [];
	isLoading!: boolean
	currentPage: number = 2;
	totalPages!: number
	fetchingMoreData: boolean = false;
	hasNextPage: boolean = true;
	isSearchActive: boolean = false;



	private subScribeCharacter!: Subscription
	private subScribeSearchCharacter!: Subscription
	constructor(private apiService: ApiService, private router: Router, private searchService: SearchService) { }





	ngOnInit(): void {
		this.isLoading = true;
		this.subScribeCharacter = this.apiService.fetchStarwarsCharacters().subscribe(response => {
			this.characters = response.results;
			this.isLoading = false;
		});
		this.subScribeSearchCharacter = this.onSearch('')
	}

	ngOnDestroy() {
		//memory leak treatment
		if (this.subScribeCharacter) {
			this.subScribeCharacter.unsubscribe();
		}
		if (this.subScribeSearchCharacter) {
			this.subScribeSearchCharacter.unsubscribe()
		}
	}

	goToCharacterDetails(id: string | null) {
		if (id) {
			this.router.navigate(['/characters', id]);
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
			this.apiService.fetchStarwarsCharacters(this.currentPage).subscribe(response => {
				const newCharacters = response.results.filter(newCharacter =>
					!this.characters.some(existingCharacter => JSON.stringify(existingCharacter) === JSON.stringify(newCharacter)));
				this.characters = [...this.characters, ...newCharacters];
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
			this.searchService.search<Character>('people', term).subscribe(data => {
				this.characters = data.results;
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





