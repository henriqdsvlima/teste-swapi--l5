import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './starships.component';
import { StarshipsDetailsComponent } from './starships-details/starships-details.component';

const routes: Routes = [{ path: '', component: StarshipsComponent },
{ path: 'starships/:id', component: StarshipsDetailsComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StarshipsRoutingModule { }
