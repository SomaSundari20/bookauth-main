import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  myBooks: any[] = [];

  book: any
  getparamid: any

  constructor(private _book: BookService, public router: ActivatedRoute , public rout : Router ) { }

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id');
    this._book.getsingleData(this.getparamid).subscribe((res) => {
      console.log(res, 'res==>');
      this.bookForm.patchValue({
        bookid: res.data[0].bookid,
        bookname: res.data[0].bookname,
        author: res.data[0].author
      })
    })

  }
  bookForm = new FormGroup({
    'bookid': new FormControl(null),
    'bookname': new FormControl(null),
    'author': new FormControl(null)
  });


  onSave() {

    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this._book.createData(this.bookForm.value).subscribe((res) => {
        console.log(res)
        this.bookForm.reset()
        this.rout.navigate(['/table'])
      })
    }
    else {
      console.log(" Required")
    }
  }

  onupdate() {
    console.log(this.bookForm.value, 'updated')

    if (this.bookForm.valid) {
      this._book.updateData(this.bookForm.value, this.getparamid).subscribe((res) => {
        console.log(res, 'resupdated..');
        this.rout.navigate(['/table'])
      })

    }

  }



}