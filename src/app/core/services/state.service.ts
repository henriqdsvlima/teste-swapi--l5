import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private relatedLinksSource = new BehaviorSubject<any>({});
	relatedLinks$ = this.relatedLinksSource.asObservable();

	constructor() { }

	updateRelatedLinks(links: any) {
		this.relatedLinksSource.next(links);
	}

}
