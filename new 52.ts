import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  generateError() {
    try {
      // Place your code here that might throw an error
      throw new Error('This is a custom error message');
    } catch (error) {
      this.showErrorDialog(error.message);
    }
  }

  showErrorDialog(errorMessage: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { errorMessage: errorMessage },
    });
  }
}

The app.component.html should be:

<button mat-raised-button (click)="generateError()">Generate Error</button>


the alert-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {errorMessage: string}) {}
}

The alert-dialog.component.html should be:

<h1 mat-dialog-title>Error</h1>
<div mat-dialog-content>{{data.errorMessage}}</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</div>

