import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { selectRowInterface } from '../ingredient/ingredient.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { EtatTask } from '../models/EtatTask';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';




@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
  providers: [ToastrService]
})
export class TaskComponent implements OnInit {
  id!: number;
  listTasks: Task[];
  NbPending!: number;
  selectedFile: File;
  image:String;
  listEtat: EtatTask[];
  etatTaskOptions = Object.values(EtatTask);
  selectedEtatTask: EtatTask = EtatTask.NOT_STARTED;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  scrollBarHorizontal = window.innerWidth < 1200;
  //selectedRowData: selectRowInterface;
  newUserImg = 'assets/images/users/user-2.png';
  data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  loadingIndicator = true;
  isRowSelected = false;
  selectedOption: string;
  reorderable = true;
 // etats: string[] = Object.values(etatTask);
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
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    //private datePipe: DatePipe
  ) {
    this.editForm = this.fb.group({
  
      name: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      description: new FormControl(),
      etatTask: new FormControl()
    });
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 1200;
    };
  }
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
    this.taskService.getTasks().subscribe((data:Task[])=>{
      this.listTasks=data
    })
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
    this.register = this.fb.group({
      name: [''],
      startDate:  [''],
      endDate:  [''],
      description:  [''],
      etatTask: ['']
    });
  }
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
  editRow(row, rowIndex, content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    this.editForm.setValue({
      name: row.name,
      startDate: row.startDate,
      endDate: row.endDate,
      description: row.description,
      etatTask: row.etatTask

    });
    this.id=row.id;
    //this.selectedRowData = row;
  }
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
        this.taskService.deleteTask(row.id).subscribe(()=>{ 
          Swal.fire(
            'Deleted!',
            'The task was deleted.',
            'success'
          ).then(() => {
            window.location.reload(); // rafraîchit la page
          });
        })
      }
    });
  }
  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id !== id;
    });
  }  

  onAddRowSave(form: FormGroup) {
    const formData = new FormData();

    const data :{
      "name": String,
      "startDate": Date,
      "endDate": Date,
      "description": String,
      "etatTask": String
    }={
      "name" : form.get("name").value, 
      "startDate":form.get("startDate").value,
      "endDate":form.get("endDate").value,
      "description":form.get("description").value,
      "etatTask":form.get("etatTask").value
    } ;
    console.log('data:', data);
    this.taskService.addTask(data).subscribe(
      res => {
        console.log('Task added : ', res);
        Swal.fire({
          icon: 'success',
          title: 'Task added successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload(); // rafraîchit la page
        });
      },
      err => console.error(err)
    );
  }
  /* parseDate(dateString: string): Date {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }
 */

  onEditSave(form: FormGroup) {
    const formData = new FormData();
    console.log("tache "+form.get("name").value)
    const data :{
      id:number,
      "name": String,
      "startDate": Date,
      "endDate": Date,
      "description": String,
      "etatTask": String
    }={
      "id": this.id,
      "name" : form.get("name").value, 
      "startDate":form.get("startDate").value,
      "endDate":form.get("endDate").value,
      "description":form.get("description").value,
      "etatTask":form.get("etatTask").value
    } ;
     
    this.taskService.updateTask(data).subscribe(
      res => {
        console.log('task updated: ', res);
        Swal.fire({
          icon: 'success',
          title: 'task updated successfully!',
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileName: string = this.selectedFile.name.substring(0, this.selectedFile.name.lastIndexOf('.'));
    const fileExt: string = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1);
    this.image = fileName + '.' + fileExt;
  }
  getUrl(): any {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        return reader.result;
      };
    }
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
      
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fetch(cb) {
  }

  deleteRecordSuccess(count) {
    this.toastr.error(count + ' Records Deleted Successfully', '');
  }
  deleteRecord(row) {
    this.data = this.arrayRemove(this.data, row.id);
  }


}
