import { NgModule } from '@angular/core';

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

// CDK Modules
import { DragDropModule } from '@angular/cdk/drag-drop';

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
  DragDropModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class SharedMaterialModule { }