import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SharedModule } from './components/shared/shared.module';




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
		SharedModule
	],
	providers: [
		HttpClient,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
