import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardsComponent } from './menu-cards/menu-cards.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';






@NgModule({
	declarations: [
		MenuCardsComponent,
		BreadcrumbComponent,
		SearchFieldComponent,
		LoadingComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule
	],
	exports: [
		MenuCardsComponent,
		BreadcrumbComponent,
		SearchFieldComponent,
		LoadingComponent
	]
})
export class SharedModule { }
