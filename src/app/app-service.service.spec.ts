import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from './app-service.service';

describe('AppService', () => {
  
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AppService ]
    });
    service = TestBed.inject( AppService);
    httpMock = TestBed.inject(HttpTestingController); // <-- here
  });

   it('should be created', () => {
    const service: AppService = TestBed.inject(AppService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: AppService = TestBed.inject(AppService);
    expect(service.getCountryData).toBeTruthy();
   });
  

});
