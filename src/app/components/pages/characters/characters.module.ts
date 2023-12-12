import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { SharedModule } from '../../shared/shared.module';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [
		CharactersComponent,
		CharactersDetailsComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		CharactersRoutingModule,
		RouterModule
	]
})
export class CharactersModule { }
