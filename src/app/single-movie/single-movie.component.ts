import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit, AfterContentChecked {

  @Input() movie: Movie = new Movie();
  @Input() action: string;

  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveMovie: EventEmitter<any> = new EventEmitter<any>();

  invalidTitle:boolean = false;
  invalidYear:boolean = false;
  invalidTitleMessage: string;
  invalidYearMessage: string;

  constructor() { }

  ngAfterContentChecked() {
    this.save(false)
  }

  ngOnInit() {
    
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  save(isButtonClicked) {
    this.validate();
    let valid = false;
    if(this.invalidYear == false && this.invalidTitle == false) {
      valid = true;
    }
    this.saveMovie.emit({
      valid: valid,
      action: this.action,
      movie: this.movie,
      isButtonClicked: isButtonClicked
    })
  }

  validate() {
    let oldMovie = null;
    if(this.action == "update") {
      oldMovie = JSON.parse(sessionStorage.getItem("updateMovie"));
    }
    if(this.movie.title == "" || this.movie.title == undefined) {
      this.invalidTitleMessage = "Movie title is a mandatory field";
      this.invalidTitle = true;
    } else {
      this.invalidTitle = false;
    }
    if(this.movie.year == null || this.movie.year == undefined) {
      this.invalidYearMessage = "Movie year is a mandatory field";
      this.invalidYear = true;
    } else if(this.movie.year < 1800) {
      this.invalidYearMessage = "Movie year is not before 1800";
      this.invalidYear = true;
    } else if(this.movie.year > new Date().getFullYear()) {
      this.invalidYearMessage = "Movie year is not after current year " + new Date().getFullYear();
      this.invalidYear = true;
    } else {
      this.invalidYear = false;
    }
  }

}
