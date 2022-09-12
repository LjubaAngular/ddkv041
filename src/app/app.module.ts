import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListDonationsComponent } from './donation/list-donations.component';
import { HomePageComponent } from './homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayDonationComponent } from './donation/display-donation.component';
import { CreateDonationComponent } from './donation/create-donation.component';
import { DisplayDonationListingComponent } from './donation/display-donation-listing.component';
import { FormsModule } from '@angular/forms';
import { DisplayDonorComponent } from './donor/display-donor.component';
import { CreateDonorComponent } from './donor/create-donor.component';
import { EditDonorComponent } from './donor/edit-donor.component';


@NgModule({
  declarations: [
    AppComponent,
    ListDonationsComponent,
    HomePageComponent,
    DisplayDonationComponent,
    CreateDonationComponent,
    DisplayDonationListingComponent,
    DisplayDonorComponent,
    CreateDonorComponent,
    EditDonorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
