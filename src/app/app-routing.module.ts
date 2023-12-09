import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/pages/home/home.component'
import { AppModule } from './app.module'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'characters',
		loadChildren: () =>
			import('./components/pages/characters/characters.module').then(
				(m) => m.CharactersModule
			)
	},
	{
		path: 'planets',
		loadChildren: () =>
			import('./components/pages/planets/planets.module').then(
				(m) => m.PlanetsModule
			)
	},
	{
		path: 'films',
		loadChildren: () =>
			import('./components/pages/films/films.module').then(
				(m) => m.FilmsModule
			)
	},
	{
		path: 'species',
		loadChildren: () =>
			import('./components/pages/species/species.module').then(
				(m) => m.SpeciesModule
			)
	},
	{
		path: 'vehicles',
		loadChildren: () =>
			import('./components/pages/vehicles/vehicles.module').then(
				(m) => m.VehiclesModule
			)
	},
	{
		path: 'starships',
		loadChildren: () =>
			import('./components/pages/starships/starships.module').then(
				(m) => m.StarshipsModule
			)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
