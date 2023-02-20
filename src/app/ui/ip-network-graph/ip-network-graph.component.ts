import { Component } from '@angular/core';
import { ElasticBackendService } from '../../elastic-backend.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-ip-network-graph',
  templateUrl: './ip-network-graph.component.html',
  styleUrls: ['./ip-network-graph.component.css']
})
export class IpNetworkGraphComponent{
  inputIpAddr: string;
  allIndices: any = [];
  isAllIndicesSelected: boolean;

  selectedIndex: string[];
  //dropdownList: { id: number; textName: string }[];
  selectedItems: { id: number; itemNamet: string }[];
  dropdownSettings: IDropdownSettings;

  ipList: any = [];
  isDataLoaded: boolean;

  constructor(private service: ElasticBackendService) {
    this.inputIpAddr = '';
    this.allIndices = [];
    this.isAllIndicesSelected = false;
    this.selectedIndex = [];
    //this.dropdownList = [];
    this.selectedItems = [];
    this.isDataLoaded = false;

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.ipList = [];

    this.service.getAllIndex().subscribe(
      (res) => {
        this.allIndices = JSON.parse(JSON.stringify(res)).indexNames;
      },
      (error) => {
        console.log('error is', error);
      }
    );
  }

  onSelectAll(item: any) {
    this.isAllIndicesSelected = true;
  }

  onItemDeSelect(item: any) {
    this.isAllIndicesSelected = false;
  }

  onSubmit() {
    this.isDataLoaded = false;
    let reqData = {};
    if (this.isAllIndicesSelected) {
      reqData = {
        inputAddr: this.inputIpAddr,
        getforAllIndex: this.isAllIndicesSelected,
        indices: this.selectedItems,
      };
    } else {
      reqData = {
        inputAddr: this.inputIpAddr,
        getforAllIndex: this.isAllIndicesSelected,
        indices: [],
      };
    }
    this.service.getDestIps(reqData).subscribe(
      (res) => {
        this.ipList = JSON.parse(JSON.stringify(res));
        // console.log('Got Ress::', this.ipList);
        this.isDataLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
