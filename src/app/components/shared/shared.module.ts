import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardsComponent } from './menu-cards/menu-cards.component';





@NgModule({
	declarations: [
		MenuCardsComponent
	],
	imports: [
		CommonModule,
	],
	exports: [
		MenuCardsComponent
	]
})
export class SharedModule { }
