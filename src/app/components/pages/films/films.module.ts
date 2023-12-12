import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
	declarations: [
		FilmsComponent,
		FilmsDetailsComponent
	],
	imports: [
		CommonModule,
		FilmsRoutingModule,
		SharedModule
	]
})
export class FilmsModule { }
