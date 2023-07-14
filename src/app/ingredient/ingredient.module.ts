import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientComponent } from './ingredient.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [IngredientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngredientRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
  ]
})
export class IngredientModule { }
