import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-search-field',
	templateUrl: './search-field.component.html',
	styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
	@Output() search = new EventEmitter<string>();
	searchControl = new FormControl();

	onSearch(value: string) {

		this.search.emit(value);
	}

	constructor() {
		// De-bounce para limitar as buscas enquanto o usuário está digitando
		this.searchControl.valueChanges
			.pipe(
				debounceTime(300), // espera por 300ms de pausa na digitação
				distinctUntilChanged() // emite apenas se o valor atual for diferente do último
			)
			.subscribe(value => {
				this.search.emit(value);
			});
	}
}
