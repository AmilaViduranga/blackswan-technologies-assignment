import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() displayMovieList: Array<Movie> = new Array<Movie>();
  @Output() updateMovie: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteMovie: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: BaseService) {

  }

  ngOnInit() {
  }

  update(movie) {
    this.updateMovie.emit(movie);
  }

  delete(movie) {
    let isConfirmed = confirm("Are you sure to delete this movie?");
    if(isConfirmed) {
      this.deleteMovie.emit(movie);
    }
  }
}
