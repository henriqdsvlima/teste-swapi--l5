import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films.component';
import { FilmsDetailsComponent } from './films-details/films-details.component';

const routes: Routes = [{ path: '', component: FilmsComponent },
{
	path: 'films/:id',
	component: FilmsDetailsComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FilmsRoutingModule { }
