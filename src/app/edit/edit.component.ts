import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  empForm:FormGroup

  education:string[]=[
    'Matric','Intermediate','Diploma','Graduate','Post Graduate'
  ]

  constructor(private formbuilder:FormBuilder,private service:EmployeeService,private dialogRef:MatDialogRef<EditComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,private _coreService:CoreService){
    this.empForm=this.formbuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.empForm.valid){
    if(this.data){
      this.service.updateemployee(this.data.id,this.empForm.value,).subscribe({
        next:(val:any)=>{
          this._coreService.openSnackBar('Employee Updated Successfully','done')
          this.dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err)
        }
      });

    }else{
      this.service.addemployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          this._coreService.openSnackBar('Employee Added Successfully!','done')
          this.dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err)
        }
      });
    }
  
   
    }
  }




}
