import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
	selector: 'app-menu-cards',
	templateUrl: './menu-cards.component.html',
	styleUrls: ['./menu-cards.component.scss']
})
export class MenuCardsComponent {
	@Input() menuCardName!: string
	@Input() routePath!: string;


	constructor(private router: Router, apiService: ApiService) { }



	navigate() {
		this.router.navigate([this.routePath]);
	}
}
