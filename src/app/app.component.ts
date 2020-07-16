import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Movie } from './models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assessment';
  search: string;
  opened: boolean = false;
  action: string = "insert";
  updateMovieObject: Movie = new Movie();
  newMovieObject: Movie = new Movie();
  movieObject: Movie = new Movie();

  displayMovieList: Array<Movie> = new Array<Movie>();
  availableMovieList: Array<Movie> = new Array<Movie>();

  constructor(private service: BaseService) {
    this.getMovies();
  }

  getMovies() {
    this.availableMovieList = [];
    this.service.get(environment.movieApi, false).subscribe(movies => {
      movies.forEach(movie => {
        let newMovie = new Movie();
        newMovie.title = movie.title;
        newMovie.year = movie.year;
        movie.cast.forEach(cast => {
          newMovie.cast.push(cast);
        });
        movie.genres.forEach(genre => {
          newMovie.genres.push(genre);
        });
        this.availableMovieList.push(newMovie);
      });
      this.displayMovieList = this.availableMovieList;
    })
  }

  filterSearch() {
    this.displayMovieList = this.availableMovieList.filter(movie => new String(movie.title.toUpperCase()).indexOf(this.search.toUpperCase()) > -1);
  }

  updateMovie(value) {
    this.opened = true;
    this.action = "update";
    this.movieObject = value;
    sessionStorage.setItem("updateMovie", JSON.stringify(value));
  }

  newMovieLoad() {
    this.opened = true;
    this.action = "insert";
    this.movieObject = new Movie();
  }

  closeModal() {
    this.opened = false;
  }

  saveMovie(value) {
    if(value.valid == false && value.action == "update") {
      let index = this.availableMovieList.findIndex(movie => movie.title == value.movie.title);
      this.availableMovieList[index] = JSON.parse(sessionStorage.getItem("updateMovie"));
    }
    if(value.valid == true && value.action == "update" && value.isButtonClicked) {
      let savedMovie = JSON.parse(sessionStorage.getItem("updateMovie"));
      let index = this.availableMovieList.findIndex(movie => movie.title == savedMovie.title);
      this.availableMovieList[index] = value.movie;
      alert("Successfully update movie " + value.movie.title);
    }
    if(value.valid == true && value.action == "insert" && value.isButtonClicked) {
      this.availableMovieList.push(value.movie);
      alert("Successfully insert new movie");
    }
  }

  deleteMovie(value) {
    let index = this.availableMovieList.findIndex(movie => movie.title == value.title && movie.id == value.id && movie.year == value.year);
    if(index > -1) {
      this.availableMovieList.splice(index, 1);
    }
    this.displayMovieList = this.availableMovieList;
    if(this.search != undefined || this.search != "") {
      this.filterSearch();
    }
  }

}
