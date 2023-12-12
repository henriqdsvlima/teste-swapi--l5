import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/pages/home/home.component'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { breadcrumb: 'Home' }

	},
	{
		path: 'characters',
		loadChildren: () =>
			import('./components/pages/characters/characters.module').then(
				(m) => m.CharactersModule
			),
		data: { breadcrumb: 'People' }
	},
	{
		path: 'planets',
		loadChildren: () =>
			import('./components/pages/planets/planets.module').then(
				(m) => m.PlanetsModule
			),
		data: { breadcrumb: 'Planets' },
	},
	{
		path: 'films',
		loadChildren: () =>
			import('./components/pages/films/films.module').then(
				(m) => m.FilmsModule,
			),
		data: { breadcrumb: 'Films' }
	},
	{
		path: 'species',
		loadChildren: () =>
			import('./components/pages/species/species.module').then(
				(m) => m.SpeciesModule
			),
		data: { breadcrumb: 'Species' }

	},
	{
		path: 'vehicles',
		loadChildren: () =>
			import('./components/pages/vehicles/vehicles.module').then(
				(m) => m.VehiclesModule
			),
		data: { breadcrumb: 'Vehicles' }
	},
	{
		path: 'starships',
		loadChildren: () =>
			import('./components/pages/starships/starships.module').then(
				(m) => m.StarshipsModule
			),
		data: { breadcrumb: 'Starships' }
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
