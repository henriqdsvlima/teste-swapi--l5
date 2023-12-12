import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { StarshipsDetailsComponent } from './starships-details/starships-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
	declarations: [
		StarshipsComponent,
		StarshipsDetailsComponent
	],
	imports: [
		CommonModule,
		StarshipsRoutingModule,
		SharedModule
	]
})
export class StarshipsModule { }
