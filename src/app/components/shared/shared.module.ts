import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCardsComponent } from './menu-cards/menu-cards.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SearchFieldComponent } from './search-field/search-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { RelatedLinksComponent } from './related-links/related-links.component';






@NgModule({
	declarations: [
		MenuCardsComponent,
		BreadcrumbComponent,
		SearchFieldComponent,
		LoadingComponent,
		RelatedLinksComponent,
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
		LoadingComponent,
		RelatedLinksComponent
	]
})
export class SharedModule { }
