import { NgModule } from '@angular/core';
import { MatIconModule, MatTableModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [MatIconModule, MatTableModule, MatSortModule],
  exports: [MatIconModule, MatTableModule, MatSortModule]
})
export class AngularMaterialModule {

}
