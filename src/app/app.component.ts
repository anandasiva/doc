import { Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title='crud';

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog:MatDialog,private service:EmployeeService,private _coreService:CoreService){}

ngOnInit(): void {
  this.getemployeelist();
}

openAddForm(){
  const dialogRef= this.dialog.open(EditComponent);
  dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getemployeelist();
      }
    }
  })
}

getemployeelist(){
  this.service.getemployeelist().subscribe({
    next:(res)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;

    },
    error:(err)=>{
      console.log(err);
    }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

deleteemployee(id:number){
  this.service.deleteemployee(id).subscribe({
    next:(res)=>{
      
      this._coreService.openSnackBar('Employee deleted!','done')
      this.getemployeelist();
    },
    error:console.log
  })

}

openEditForm(data:any){
  const dialogRef=this.dialog.open(EditComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getemployeelist();
      }
    }
  })

}


}
