import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharactersComponent } from './characters.component'
import { CharactersDetailsComponent } from './characters-details/characters-details.component'

const routes: Routes = [
	{
		path: '',
		component: CharactersComponent,
		data: { breadcrumb: 'Pessoas' }
	},
	{
		path: 'characters/:id',
		component: CharactersDetailsComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CharactersRoutingModule { }
