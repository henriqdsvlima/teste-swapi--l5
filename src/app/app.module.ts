import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SharedModule } from './components/shared/shared.module';
import { CharactersModule } from './components/pages/characters/characters.module';
import { PlanetsModule } from './components/pages/planets/planets.module';
import { SpeciesModule } from './components/pages/species/species.module';
import { StarshipsModule } from './components/pages/starships/starships.module';
import { VehiclesModule } from './components/pages/vehicles/vehicles.module';
import { FilmsModule } from './components/pages/films/films.module';




@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		CharactersModule,
		FilmsModule,
		PlanetsModule,
		SpeciesModule,
		StarshipsModule,
		VehiclesModule,
		SharedModule,
	],
	providers: [
		HttpClient,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
