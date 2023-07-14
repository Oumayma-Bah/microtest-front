import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecetteRoutingModule } from './recette-routing.module';
import { RecetteComponent } from './recette.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [RecetteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecetteRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ]
})
export class RecetteModule { }
