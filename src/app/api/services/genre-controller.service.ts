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

import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root',
})
export class GenreControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation suggestGenres
   */
  static readonly SuggestGenresPath = '/genres/suggest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suggestGenres()` instead.
   *
   * This method doesn't expect any request body.
   */
  suggestGenres$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Genre>>> {

    const rb = new RequestBuilder(this.rootUrl, GenreControllerService.SuggestGenresPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Genre>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suggestGenres$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suggestGenres(params?: {
    context?: HttpContext
  }
): Observable<Array<Genre>> {

    return this.suggestGenres$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Genre>>) => r.body as Array<Genre>)
    );
  }

}
