import { Component, OnInit } from '@angular/core';
import { DestinationIpsService } from 'src/app/services/destination-ips.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ip-network-graph',
  templateUrl: './ip-network-graph.component.html',
  styleUrls: ['./ip-network-graph.component.css']
})
export class IpNetworkGraphComponent implements OnInit{
  inputIpAddr: string;
  destinaionIps: {ip: string, count: Number, children: {}[]}[] = [];
  isDataLoaded: boolean;
  hasCausedError: boolean;
  errorMesssage: string

  constructor(private destIpService: DestinationIpsService, private route: ActivatedRoute) {
    this.inputIpAddr = '';
    this.destinaionIps = [];
    this.isDataLoaded = false;
    this.hasCausedError = false;
    this.errorMesssage = '';
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

      this.destIpService.getDestinationIpsForAllIndices(this.inputIpAddr).subscribe({
        next: (resObj) => {
          if(resObj.hasOwnProperty('data')){
            this.destinaionIps = resObj['data'];
            console.log("ip-netwrok-graph::Recieved Data from backend: '", this.destinaionIps, "'");
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
}
