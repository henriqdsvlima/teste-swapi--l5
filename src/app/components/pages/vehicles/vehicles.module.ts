import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesDetailsComponent } from './vehicles-details/vehicles-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
	declarations: [
		VehiclesComponent,
		VehiclesDetailsComponent
	],
	imports: [
		CommonModule,
		VehiclesRoutingModule,
		SharedModule
	]
})
export class VehiclesModule { }
