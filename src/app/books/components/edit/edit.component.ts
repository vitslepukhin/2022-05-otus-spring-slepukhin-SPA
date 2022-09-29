import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../api/models';
import {
  AuthorControllerService,
  BookControllerService,
  GenreControllerService,
} from '../../../api/services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent implements OnInit {
  dialogTitle = this.isNewBook() ? 'New book' : 'Edit book';

  titleFormControl = new FormControl(this.book?.title, Validators.required);
  genreFormControl = new FormControl(this.book?.genre,Validators.required);
  authorsFormControl = new FormControl(this.book?.authors, Validators.required);

  formGroup = new FormGroup({
    id: new FormControl(this.book?.id),
    title: this.titleFormControl,
    genre: this.genreFormControl,
    authors: this.authorsFormControl,
  });

  genres$ = this.genreApiService.suggestGenres();
  authors$ = this.authorApiService.suggestAuthors();

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private genreApiService: GenreControllerService,
    private authorApiService: AuthorControllerService,
    private booksApiService: BookControllerService
  ) {}

  ngOnInit(): void {}

  isNewBook(): boolean {
    return !this.book?.id;
  }

  save(): void {
    const book: Book = this.formGroup.value as Book;

    (() => {
      if (book.id) {
        return this.booksApiService.putBook({ id: book.id, body: book });
      } else {
        return this.booksApiService.createBook({ body: book });
      }
    })().subscribe((savedBook) => {
      this.dialogRef.close(savedBook);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  compareById<O1 extends { id: number }, O2 extends { id: number }>(
    o1: O1,
    o2: O2
  ): boolean {
    return o1?.id === o2?.id;
  }
}
