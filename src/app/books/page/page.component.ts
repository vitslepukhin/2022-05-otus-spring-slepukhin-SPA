import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Book } from '../../api/models/book';
import { BookControllerService } from '../../api/services';
import { EditDialogComponent } from '../components/edit/edit.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'authors', 'genre', 'actions'];
  dataSource = new MatTableDataSource<Book>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Book>;

  private destroy$ = new Subject<void>();

  constructor(
    private booksApiService: BookControllerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.table.trackBy = (index: number, book: Book): string => {
      return `${book.id}`;
    };
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.booksApiService
      .getAllBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        this.dataSource.data = books;
        this.cd.markForCheck();
      });
  }

  edit(book: Book): void {
    this.openEditDialog(book);
  }

  addNew(): void {
    this.openEditDialog();
  }

  remove(book: Book): void {
    if (!book.id) {
      return;
    }

    this.booksApiService
      .deleteBook({ id: book.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (bookToFilter) => bookToFilter.id !== book.id
        );
        this.openSnackBar(`Book ${book.title} successfully deleted.`);
        this.cd.markForCheck();
      });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, void 0, {
      duration: 4000,
    });
  }

  private openEditDialog(book?: Book) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: book,
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe()
      .subscribe((savedBook) => {
        if (!savedBook) {
          return;
        }

        const existBookIndex = this.dataSource.data.findIndex(
          (book) => savedBook.id === book.id
        );

        if (existBookIndex > -1) {
          this.dataSource.data[existBookIndex] = savedBook;
          this.dataSource.data = [...this.dataSource.data];
        } else {
          this.dataSource.data = this.dataSource.data.concat(savedBook);
        }

        this.openSnackBar(`Book ${savedBook.title} successfully saved.`);
        this.cd.markForCheck();
      });
  }
}
