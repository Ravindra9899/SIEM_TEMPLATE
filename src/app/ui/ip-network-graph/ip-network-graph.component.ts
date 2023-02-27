import { Component, OnInit } from '@angular/core';
import { DestinationIpsService } from 'src/app/services/destination-ips.service';
import { ActivatedRoute } from '@angular/router';
import { Node } from './am-charts-graph/node.model';

@Component({
  selector: 'app-ip-network-graph',
  templateUrl: './ip-network-graph.component.html',
  styleUrls: ['./ip-network-graph.component.css']
})
export class IpNetworkGraphComponent implements OnInit{
  inputIpAddr: string;
  isDataLoaded: boolean;
  hasCausedError: boolean;
  errorMesssage: string;
  amChartsGraphData : Node;

  constructor(private destIpService: DestinationIpsService, private route: ActivatedRoute) {
    this.inputIpAddr = '';
    this.isDataLoaded = false;
    this.hasCausedError = false;
    this.errorMesssage = '';
    this.amChartsGraphData = new Node("Root", 0, '', -1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params.hasOwnProperty('ip')){
        const ip = params['ip'];
        console.log("ip-netwrok-graph::Got IP from URL param : '", ip, "'");
        if(this.isValidIp(ip)){
          this.inputIpAddr = ip;
        } else {
          this.hasCausedError = true;
          this.errorMesssage = 'Ip defined in url is not valid!!';
        }
      } else {
        this.hasCausedError = true;
        this.errorMesssage = "No 'ip' defined in url, above!!";
      }
    });

    if(!this.hasCausedError){
      this.isDataLoaded = false;
      this.getResponseFromBackend(this.inputIpAddr);
    }
  }

  getResponseFromBackend(sourceIpAddress: string): void{
    this.destIpService.getDestinationIpsForAllIndices(sourceIpAddress).subscribe({
      next: (resObj) => {
        if(resObj.hasOwnProperty('data')){
          let ipObjList = resObj['data'];
          console.log("ip-netwrok-graph::Recieved Data from backend: '", ipObjList, "'");

          let level0Node = new Node(this.inputIpAddr, 400, 'Source Ip Address', 0);
          level0Node.addIpObjListAsChildren(ipObjList);
          this.amChartsGraphData.children.push(level0Node);
          console.log("data in parent: ", this.amChartsGraphData);

          this.isDataLoaded = true;
        } else {
          this.hasCausedError = true;
          this.errorMesssage = resObj['error'];
        }
      },
      error: (err) => {
        this.hasCausedError = true;
        this.errorMesssage = err;
      },
      complete: () => console.info("ip-netwrok-graph::Post Request 'getDestinationIpsForAllIndices' completed")
    });
  }

  isValidIp(inputIpAddr: string): boolean{
    let blocks = inputIpAddr.trim().split('.');
    if(blocks.length != 4){
        return false;
    } else {
        let state = true;
        for(let block of blocks) {
            if (isNaN(Number(block)) || Number(block) < 0 || Number(block) > 255){
                state = false;
            }
        }
        return state;
    }
  }

  getNodeClickedHandler(clickedNode: {ip: string, level: number}){
    this.isDataLoaded = false;
    this.destIpService.getDestinationIpsForAllIndices(clickedNode.ip).subscribe({
      next: (resObj) => {
        if(resObj.hasOwnProperty('data')){
          let ipObjList = resObj['data'];
          console.log("ip-netwrok-graph::On clicking the ip: '", clickedNode.ip, "' and got childs: '", ipObjList, "'");

          let currentRoot = this.amChartsGraphData.children[0];
          let newRoot = Node.addChildrenToGraph(currentRoot, ipObjList, clickedNode);
          let newAmChartsGraphData = new Node("root", 0, '', -1);
          newAmChartsGraphData.children.push(newRoot);
          this.amChartsGraphData = newAmChartsGraphData;
          console.log("changed data in parent: ", this.amChartsGraphData);

          this.isDataLoaded = true;
        } else {
          this.hasCausedError = true;
          this.errorMesssage = resObj['error'];
        }
      },
      error: (err) => {
        this.hasCausedError = true;
        this.errorMesssage = err;
      },
      complete: () => console.info("ip-netwrok-graph::Post Request 'getDestinationIpsForAllIndices' completed")
    });
  }
}
