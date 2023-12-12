import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesComponent } from './species.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';

const routes: Routes = [{ path: '', component: SpeciesComponent },
{ path: 'species/:id', component: SpeciesDetailsComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpeciesRoutingModule { }
