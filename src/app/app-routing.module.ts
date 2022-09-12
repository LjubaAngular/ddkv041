import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDonationComponent } from './donation/create-donation.component';
import { ListDonationsComponent } from './donation/list-donations.component';
import { CreateDonorComponent } from './donor/create-donor.component';
import { EditDonorComponent } from './donor/edit-donor.component';
import { HomePageComponent } from './homepage.component';


const routes: Routes = [
  {path: "home", component: HomePageComponent},
  {path: "listdonations", component: ListDonationsComponent},
  {path: "createdonation", component: CreateDonationComponent},
  {path: "createdonor", component: CreateDonorComponent},
  { path: 'edit/:id', component: EditDonorComponent },
  {path:"", redirectTo: "/home", pathMatch: "full"}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
