import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesComponent } from './species.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SpeciesComponent,
    SpeciesDetailsComponent
  ],
  imports: [
    CommonModule,
	SharedModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
