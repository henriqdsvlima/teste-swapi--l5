import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

interface Breadcrumb {
	label: string;
	url: string;
}

@Injectable({
	providedIn: 'root'
})
export class BreadcrumbService {
	private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
	public breadcrumbs$ = this.breadcrumbs.asObservable();

	constructor(private router: Router) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
			this.buildBreadCrumb(this.router.routerState.snapshot.root);
		});
	}

	private buildBreadCrumb(routeSnapshot: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = [{ label: 'Home', url: '/' }]): void {
		if (routeSnapshot.routeConfig && routeSnapshot.data) {
			const label = routeSnapshot.data['breadcrumb'];
			const path = routeSnapshot.url.map(segment => segment.path).join('/');
			if (label && path) {
				const fullPath = `${url}/${path}`;
				breadcrumbs.push({ label, url: fullPath });
			}
		}

		if (routeSnapshot.firstChild) {
			this.buildBreadCrumb(routeSnapshot.firstChild, url, breadcrumbs);
		} else {
			this.breadcrumbs.next(breadcrumbs);
		}
	}

	// Função para atualizar o breadcrumb manualmente
	public updateBreadcrumbForCharacter(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'People', url: '/characters' },
			{ label: name, url: `/characters/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}


	public updateBreadcrumbForPlanet(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'Planets', url: '/planets' },
			{ label: name, url: `/planets/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}

	public updateBreadcrumbForFilm(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'Films', url: '/films' },
			{ label: name, url: `/films/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}

	public updateBreadcrumbForSpecies(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'Species', url: '/species' },
			{ label: name, url: `/species/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}

	public updateBreadcrumbForStarships(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'Starships', url: '/starships' },
			{ label: name, url: `/starships/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}

	public updateBreadcrumbForVehicles(name: string, id: string): void {
		const updatedBreadcrumbs = [
			{ label: 'Home', url: '/' },
			{ label: 'Vehicles', url: '/vehicles' },
			{ label: name, url: `/vehicles/${id}` }
		];
		this.breadcrumbs.next(updatedBreadcrumbs);
	}
}

