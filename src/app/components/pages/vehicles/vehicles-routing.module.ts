import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesDetailsComponent } from './vehicles-details/vehicles-details.component';

const routes: Routes = [{ path: '', component: VehiclesComponent },
{ path: 'vehicles/:id', component: VehiclesDetailsComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VehiclesRoutingModule { }
