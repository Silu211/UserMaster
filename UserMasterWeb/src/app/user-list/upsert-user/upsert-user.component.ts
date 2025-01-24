import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IUsersDetailModel } from '../user-list.model';

@Component({
  selector: 'app-upsert-user',
  templateUrl: 'upsert-user.component.html',
  standalone: false
})
export class UpsertUserComponent implements OnInit {
  maxDate: string;
  userProfilePicture: string;
  userForm: FormGroup;
  userId: number;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.setupUserMasterForm();
    const userId = this.activatedRoute.snapshot.paramMap.get('userid');
    if (userId) {
      this.userId = +userId;
      this.userService.getUserDetailsById(this.userId).subscribe((data: IUsersDetailModel) => {
        this.userForm.patchValue(data);
        this.userForm.get('dob')?.setValue(data.dob.toString().split('T')[0]);
      });
    }
  }

  upsertUserDetails(userDetailToUpsert: IUsersDetailModel): void {
    this.userService.upsertUserDetails(userDetailToUpsert).subscribe((id: number) => {
      if (userDetailToUpsert.userId === 0) {
        alert('User with id ' + id + ' added Successfully');
      }
      else {
        alert('User with id ' + id + ' updated Successfully');
      }
      if (sessionStorage.length > 0) {
        this.router.navigateByUrl('users');
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }

  onFileSelected(event: any): void {
    const uploadedFile = event.target.files[0];
    if (uploadedFile.size < 5242880) {//5 MB Max
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => {
        this.userForm.get('profilePicture')?.setValue(reader.result);
        this.userForm.get('profilePictureName')?.setValue(uploadedFile.name);
      };
    }
    else {
      alert('Uploaded image must be less 5MB')
    }
  }

  onCancelClick(): void {
    if (sessionStorage.length > 0) {
      this.router.navigateByUrl('users');
    } else {
      this.router.navigateByUrl('login');
    }  }

  private setupUserMasterForm(): void {
    this.userForm = this.formBuilder.group({
      userId: [0, [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dob: [null, [Validators.required]],
      address: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      profilePicture: ['', Validators.required],
      profilePictureName: ['']
    });

  }
}
