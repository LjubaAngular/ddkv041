import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IDonation } from '../donation/idonation';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IDonor } from '../donor/idonor';
import { IDonationListing } from '../donation/idonationlisting';
import { IStatus } from '../donor/istatus';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  // baseUrl1 = 'http://localhost:3000/donations';

  // baseUrl2 = 'http://localhost:3000/donationListings';

  // baseUrl3 = 'http://localhost:3000/donors';

  // baseUrl4 = 'http://localhost:3000/statuses';

  baseUrl1 = 'https://my-json-server.typicode.com/LjubaAngular/ddkv04/donations';

  baseUrl2 = 'https://my-json-server.typicode.com/LjubaAngular/ddkv04/donationListings';

  baseUrl3 = 'https://my-json-server.typicode.com/LjubaAngular/ddkv04/donors';

  baseUrl4 = 'https://my-json-server.typicode.com/LjubaAngular/ddkv04/statuses';

  // statusList: IStatus[] = [
  //   {
  //     "id": 1,
  //     "statusName": "1 Radnik BVK"
  //   },
  //   {
  //     "id": 2,
  //     "statusName": "2 Penzioner"
  //   },
  //   {
  //     "id": 3,
  //     "statusName": "3 Zaposlen"
  //   },
  //   {
  //     "id": 4,
  //     "statusName": "4 Nezaposlen"
  //   }
  // ];

  statusList: string[] = [
      "1 Radnik BVK",
      "2 Penzioner",
      "3 Zaposlen",
      "4 Nezaposlen" 
  ];

  

  constructor(private _httpClient: HttpClient) {
  }


  getDonations(): Observable<IDonation[]> {
    return this._httpClient.get<IDonation[]>(this.baseUrl1)
      .pipe(catchError(this.handleError));
  }


  getDonation(id: number): Observable<IDonation> {
    return this._httpClient.get<IDonation>(`${this.baseUrl1}/${id}`)
      .pipe(catchError(this.handleError));
  }


  addDonation(donation: IDonation): Observable<IDonation> {
    return this._httpClient.post<IDonation>(this.baseUrl1, donation, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  getDonationListings(): Observable<IDonationListing[]> {
    return this._httpClient.get<IDonationListing[]>(this.baseUrl2)
      .pipe(catchError(this.handleError));
  }
  

  getDonors(): Observable<IDonor[]> {
    return this._httpClient.get<IDonor[]>(this.baseUrl3)
      .pipe(catchError(this.handleError));
  }

  putDonor(donor: IDonor): Observable<IDonor> {
    return this._httpClient.put<IDonor>(`${this.baseUrl3}/${donor.id}`, donor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  postDonationListing(donationListing: IDonationListing): Observable<IDonationListing> {
    return this._httpClient.post<IDonationListing>(this.baseUrl2, donationListing, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  postDonor(donor: IDonor): Observable<IDonor> {
    return this._httpClient.post<IDonor>(this.baseUrl3, donor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  // getStatusList(): Observable<IStatus[]> {
  //   return this._httpClient.get<IStatus[]>(this.baseUrl4)
  //     .pipe(catchError(this.handleError));
  // }

  getStatusList(): string[] {
    return this.statusList;
  }



  


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }


}
