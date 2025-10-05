import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationModal } from './components/confirmation-modal/confirmation-modal';

// CDK Modules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Loader } from './components/loader/loader';

// Common Angular modules
const angularModules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];

// Material Design modules
const materialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDividerModule,
  MatToolbarModule,
  MatMenuModule,
  MatBadgeModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTooltipModule,
  DragDropModule,
];

@NgModule({
  declarations: [Loader, ConfirmationModal],
  imports: [
    ...angularModules,
    ...materialModules
  ],
  exports: [
    ...angularModules,
    ...materialModules,
    Loader,
    ConfirmationModal
  ]
})
export class SharedModule { }