import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// WebView HTTP call service
@Injectable()
export class OnfidoAngularService {

  // Replace with API Gateway url
  API_URL = 'https://myzvn3k0mb.execute-api.us-east-1.amazonaws.com/dev'
  sandboxMode: boolean

  constructor(private http: HttpClient) { }
  
  setSandboxMode(sandboxMode: boolean) {
    this.sandboxMode = sandboxMode
  }

  /**
   * Creates an applicant (person to have his id checked)
   * @returns {Observable<any>} returns a promise that resolve on success, and reject on failure
   */
  createApplicant(): Observable<any> {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/applicants'
    console.log('createApplicant header = ', { headers: header })
    return this.http.post(url, {}, { headers: header })
  }

  /**
   * Generate SDK token
   * @param applicantId 
   * @param url - Url used by aplication as a referrer for doucment upload on SDK
   * @returns {Observable<any>} returns a promise that resolve on success, and reject on failure 
   */
  generateSDKToken(applicantId: string, referrerUrl: string): Observable<any> {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/sdk_token'
    var body: any = { 'applicant_id': applicantId, 'referrerUrl': referrerUrl }
    console.log('generateSDKToken body sent = ', body)
    return this.http.post(url, body, { headers: header })
  }

  /**
   * Create a check based on applicantId
   * @returns {Observable<any>} returns a promise that resolve on success, and reject on failure
   */
  createCheck(applicantId: string, consider: boolean, variant: string): Observable<any> {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/applicants/checks'
    var body: any = { 'applicantId': applicantId, 'consider': consider, 'variant': variant }  
    return this.http.post(url, body, { headers: header })
  }

  /**
   * Get names from document - autofill
   * @returns {Observable<any>} returns a promise that resolve on success, and reject on failure
   */
  getNamesFromDocument(applicantId: string): Observable<any> {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/applicants/autofill'
    var body: any = { 'applicantId': applicantId }  
    return this.http.post(url, body, { headers: header })
  }

  /**
   * Update applicant name
   * @param applicantId 
   * @param firstName 
   * @param lastName 
   */
  updateApplicantName(applicantId: string, firstName: string, lastName: string): Observable<any> {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/applicants/update/name'
    var body: any = { 'applicantId': applicantId, 'firstName': firstName, 'lastName': lastName }  
    return this.http.post(url, body, { headers: header })
  }

  /**
   * Retrieve the check result 
   * @param checkId 
   * @param applicantId 
   */
  getCheckResult(checkId: string, applicantId: string) {
    var header: HttpHeaders = this.getHeader()
    var url: string = this.API_URL + '/applicants/checks/result'
    var body: any = { 'applicantId': applicantId, 'checkId': checkId }  
    return this.http.post(url, body, { headers: header })
  }

  getHeader() {
    let header: HttpHeaders = new HttpHeaders();
    header = header.set('Content-Type', 'application/json')
    .set('sandboxMode', JSON.stringify(this.sandboxMode));
    return header
  }
}
