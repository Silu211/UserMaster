import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "./user.service";
import { IUsersDetailModel } from "./user-list.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html',
    standalone: false
})
export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['userId', 'userName', 'dob', 'address', 'emailId', 'actions'];
    dataSource: MatTableDataSource<IUsersDetailModel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userListService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadAllUsers();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    exportToExcel(): void {
        const columnNames = ['Id', 'Name', 'DOB', 'Address', 'Email Id'];
        const transformedData = this.dataSource.filteredData.map(item => ({
            Id: item.userId,
            Name: item.userName,
            DOB: item.dob,
            Address: item.address,
            'Email Id': item.emailId
        }));

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transformedData, { header: columnNames });

        const workbook: XLSX.WorkBook = {
            Sheets: { 'data': worksheet },
            SheetNames: ['data']
        };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
        saveAs(data, 'User_List.xlsx');
    }

    exportToPDF(): void {
        const columnNames = ['Id', 'Name', 'DOB', 'Address', 'Email Id'];
        const mappedData = this.dataSource.filteredData.map(item => ({
            Id: item.userId,
            Name: item.userName,
            DOB: item.dob,
            Address: item.address,
            'Email Id': item.emailId
        }));

        const rows = mappedData.map(item => Object.values(item));

        const doc = new jsPDF();

        (doc as any).autoTable({
            head: [columnNames],
            body: rows,
        });

        doc.save('User_List.pdf');
    }

    onAddClick(): void {
        this.router.navigateByUrl('upsert-user');
    }

    onEditClick(userId: number): void {
        this.router.navigateByUrl('upsert-user/' + userId);
    }

    onDeleteClick(userId: number): void {
        this.userListService.deleteUser(userId).subscribe(() => {
            alert('User deleted successfully..!!');
            this.loadAllUsers();
        });
    }

    private loadAllUsers(): void {
        const sub = this.userListService.getAllUserDetails().subscribe((response: IUsersDetailModel[]) => {
            sub.unsubscribe();
            response.forEach((data: IUsersDetailModel) => {
                this.userListService.getUserProfilePicture(data.userId).subscribe((profilePicture: string) => {
                    data.profilePicture = profilePicture;
                });
            });
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}