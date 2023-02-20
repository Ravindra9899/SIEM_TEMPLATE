import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  private availableApis: Record<string,any>[]=[];

  constructor() { }

  ngOnInit(): void {
    this.setAvailableApis();
  }

  getAvailableApis(){
    return this.availableApis;
  }

  setAvailableApis(){
    this.availableApis = [
      {
        "id": 0,
        "apiName": "Virus Total", 
        "status": "Active"
      },
      {
        "id": 1,
        "apiName": "Who Is",
        "status": "Inactive"
      }
    ];
  }

  onApiView(idOfApi: Number){
    console.log("View API of Index ", idOfApi);
  }

  onApiDelete(idOfApi:Number){
    console.log("Delete API at Index ", idOfApi);
  }

  onApiEdit(idOfApi:Number){
    console.log("Edit API at Index ", idOfApi);
  }

  onApiDisable(idOfApi:Number){
    console.log("Disable API at Index ", idOfApi);
  }

}
