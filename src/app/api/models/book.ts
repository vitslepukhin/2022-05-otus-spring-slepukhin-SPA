/* tslint:disable */
/* eslint-disable */
import { Author } from './author';
import { Genre } from './genre';
export interface Book {
  authors?: Array<Author>;
  genre?: Genre;
  id?: number;
  title?: string;
}
