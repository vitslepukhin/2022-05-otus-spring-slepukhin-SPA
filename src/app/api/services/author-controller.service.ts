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

import { Author } from '../models/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation suggestAuthors
   */
  static readonly SuggestAuthorsPath = '/authors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suggestAuthors()` instead.
   *
   * This method doesn't expect any request body.
   */
  suggestAuthors$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Author>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthorControllerService.SuggestAuthorsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Author>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suggestAuthors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suggestAuthors(params?: {
    context?: HttpContext
  }
): Observable<Array<Author>> {

    return this.suggestAuthors$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Author>>) => r.body as Array<Author>)
    );
  }

}
