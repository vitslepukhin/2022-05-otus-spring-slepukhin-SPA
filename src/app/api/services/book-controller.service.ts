/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getBook
   */
  static readonly GetBookPath = '/books/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.GetBookPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBook(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Book> {

    return this.getBook$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

  /**
   * Path part for operation putBook
   */
  static readonly PutBookPath = '/books/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putBook$Response(params: {
    id: number;
    context?: HttpContext
    body: Book
  }
): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.PutBookPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putBook(params: {
    id: number;
    context?: HttpContext
    body: Book
  }
): Observable<Book> {

    return this.putBook$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

  /**
   * Path part for operation deleteBook
   */
  static readonly DeleteBookPath = '/books/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.DeleteBookPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteBook$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllBooks
   */
  static readonly GetAllBooksPath = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooks$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Book>>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.GetAllBooksPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Book>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBooks(params?: {
    context?: HttpContext
  }
): Observable<Array<Book>> {

    return this.getAllBooks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Book>>) => r.body as Array<Book>)
    );
  }

  /**
   * Path part for operation createBook
   */
  static readonly CreateBookPath = '/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook$Response(params: {
    context?: HttpContext
    body: Book
  }
): Observable<StrictHttpResponse<Book>> {

    const rb = new RequestBuilder(this.rootUrl, BookControllerService.CreateBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Book>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook(params: {
    context?: HttpContext
    body: Book
  }
): Observable<Book> {

    return this.createBook$Response(params).pipe(
      map((r: StrictHttpResponse<Book>) => r.body as Book)
    );
  }

}
