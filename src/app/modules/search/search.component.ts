import { Component, OnInit } from '@angular/core';
import {TvMazeService} from '../../services/tv-maze.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../form/form-validation.service';
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import {Show} from '../../interfaces';
import {TvtrackerService} from '../../services/tvtracker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchForm : FormGroup
  shows: Show[]

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private tvMaze: TvMazeService,
    private tvtrackerService: TvtrackerService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.searchObserver()
  }

  buildForm() {
    this.searchForm = this.fb.group({
      'search': ['', [Validators.required]]
    })
  }

  searchObserver() {
    let search = this.searchForm.controls['search']
    search.valueChanges
      .debounceTime(800)
      .filter(text => text.length >= 1)
      .distinctUntilChanged()
      .flatMap(query => {
        return this.tvMaze.search(query)
      })
      .subscribe(res => {
        this.shows = res
      })
  }

  search(event : any) {
    this.tvMaze.search(event.target.value)
  }

  subscribe(show: Show) {
    this.tvtrackerService.subscribe(show.id, show.name)
      .subscribe()
  }

}