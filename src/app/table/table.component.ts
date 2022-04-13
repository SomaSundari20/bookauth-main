import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../services/book.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private _book: BookService,public rout : Router) { }


  book: any
  ngOnInit(): void {

    this.getallData()
  }

  onClick(){
    this.rout.navigate(['/book'])
  }

  delete(id: any) {
    console.log(id, 'deleteid==>')
    this._book.deleteData(id).subscribe((res) => {
      console.log(res, 'deleteres=>')
    })
    this.getallData()
  }


  getallData() {
    this._book.getAllData().subscribe((res) => {
      console.log(res)
      this.book = res.data;
    })
  }
}
