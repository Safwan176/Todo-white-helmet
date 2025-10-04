import { NgModule, Type } from '@angular/core';
import { SharedModule } from './shared.module';

// Add shared components here as you create them
// Example:
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const sharedComponents: Type<any>[] = [
  // LoadingSpinnerComponent,
  // ConfirmDialogComponent,
];

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    ...sharedComponents
  ]
})
export class SharedComponentsModule { }