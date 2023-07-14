import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../services/ingredient.service';
import Swal from 'sweetalert2';
import { Ingredient } from '../models/Ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.sass'],
  providers: [ToastrService]
})
export class IngredientComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  selectedFile: File;
  rows = [];
  scrollBarHorizontal = window.innerWidth < 1200;
  selectedRowData: selectRowInterface;
  newUserImg = 'assets/images/users/user-2.png';
  data = [];
  image:String;
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  loadingIndicator = true;
  isRowSelected = false;
  selectedOption: string;
  reorderable = true;
  public selected: any[] = [];
  columns = [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Designation' },
    { name: 'Gender' },
    { name: 'Phone' },
    { name: 'Email' },
    { name: 'Status' },
    { name: 'Address' },
  ];
  genders = [
    { id: '1', value: 'male' },
    { id: '2', value: 'female' },
  ];
  statusType = [
    { id: '1', value: 'Active' },
    { id: '2', value: 'Completed' },
    { id: '3', value: 'Pending' },
  ];
  designationType = [
    { id: '1', value: 'Manager' },
    { id: '2', value: 'Team Leader' },
    { id: '3', value: 'Clerk' },
  ];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  id_ingredient!: number;
  listIngredient: Ingredient[];
  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      nom: new FormControl(),
      image: new FormControl()
    });
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 1200;
    };
  }
  // select record using check box
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    if (this.selected.length === 0) {
      this.isRowSelected = false;
    } else {
      this.isRowSelected = true;
    }
  }
  deleteSelected() {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.selected.forEach((row) => {
          this.deleteRecord(row);
        });
        this.deleteRecordSuccess(this.selected.length);
        this.selected = [];
        this.isRowSelected = false;
      }
    });
  }
  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((data:Ingredient[])=>{
      this.listIngredient=data
    })
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
    this.register = this.fb.group({
      nom: [''],
      image: ['']
    });
  }
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/adv-tbl-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // add new record
  addRow(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    this.register.patchValue({
      id: this.getId(10, 100),
      img: this.newUserImg,
    });
  }
  // edit record
  editRow(row, rowIndex, content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    this.editForm.setValue({
      nom: row.nom,
      image: row.image
    });
    this.id_ingredient=row.id_ingredient;
    this.selectedRowData = row;
  }
  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.deleteRecord(row);
        this.deleteRecordSuccess(1);
        this.ingredientService.deleteIngredient(row.id_ingredient).subscribe(()=>{ 
          Swal.fire(
            'Supprimé!',
            'Lingredient a été supprimé.',
            'success'
          ).then(() => {
            window.location.reload(); // rafraîchit la page
          });
        })
        window.location.reload();
      }
    });
  }

  deleteRecord(row) {
    this.data = this.arrayRemove(this.data, row.id);
  }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id !== id;
    });
  }
  // save add new record
  onAddRowSave(form: FormGroup) {
    const formData = new FormData();
    const data :{
      "nom" : String,
      "image":String
    }={
      "nom" : form.get("nom").value,
      "image":this.image
    } ;
    this.ingredientService.addIngredient(data).subscribe(
      res => {
        console.log('ingredient ajouté: ', res);
        Swal.fire({
          icon: 'success',
          title: 'ingredient ajouté avec succès!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload(); // rafraîchit la page
        });
      },
      err => console.error(err)
    );
  }
  // save record on 
  onEditSave(form: FormGroup) {
    const formData = new FormData();
    console.log("nom recette "+form.get("nom").value)
    const data :{
      id_ingredient:number,
      "nom" : String
    }={
      "id_ingredient":this.id_ingredient,
      "nom" : form.get("nom").value
    } ;
     
    this.ingredientService.updateIngredient(data).subscribe(
      res => {
        console.log('ingredient modifié : ', res);
        Swal.fire({
          icon: 'success',
          title: 'ingredient modifie  avec succès!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload(); // rafraîchit la page
        });
      },
      err => console.error(err)
    );
    
      
      this.modalService.dismissAll();
      
      this.editRecordSuccess();
      return true;
  }
  // filter table data
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  // get random id
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  addRecordSuccess() {
    this.toastr.success('Add Record Successfully', '');
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' Records Deleted Successfully', '');
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileName: string = this.selectedFile.name.substring(0, this.selectedFile.name.lastIndexOf('.'));
    const fileExt: string = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1);
    this.image = fileName + '.' + fileExt;
  }
}
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}

