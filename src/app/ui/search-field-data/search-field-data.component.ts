import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService, Person } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-field-data',
  templateUrl: './search-field-data.component.html',
  styleUrls: ['./search-field-data.component.css']
})
export class SearchFieldDataComponent implements OnInit {

  constructor(){
    this.selectedCar = 1;
  }
  ngOnInit(): void {

  }
  selectedCar: number;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
}
