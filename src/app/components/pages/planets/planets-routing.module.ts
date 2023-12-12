import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsComponent } from './planets.component';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';

const routes: Routes = [
	{
		path: '',
		component: PlanetsComponent,
		data: { breadcrumb: 'Planets' }
	},
	{ path: 'planets/:id', component: PlanetsDetailsComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlanetsRoutingModule { }
