import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
	declarations: [
		PlanetsComponent,
		PlanetsDetailsComponent
	],
	imports: [
		CommonModule,
		PlanetsRoutingModule,
		SharedModule
	]
})
export class PlanetsModule { }
