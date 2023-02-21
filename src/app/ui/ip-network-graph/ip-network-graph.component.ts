import { Component, OnInit } from '@angular/core';
import { ElasticBackendService } from '../../elastic-backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ip-network-graph',
  templateUrl: './ip-network-graph.component.html',
  styleUrls: ['./ip-network-graph.component.css']
})
export class IpNetworkGraphComponent implements OnInit{
  inputIpAddr: string;
  ipList: {ip: string, count: string}[] = [];
  isDataLoaded: boolean;

  constructor(private service: ElasticBackendService, private route: ActivatedRoute) {
    this.inputIpAddr = '';
    this.ipList = [];
    this.isDataLoaded = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const ip = params['ip'];
      console.log("Got IP from URL param :: ", ip);
      this.inputIpAddr = ip;
    });

    this.isDataLoaded = false;

    let reqData = {
      inputIpAddress: this.inputIpAddr
    };

    this.service.getDestIps(reqData).subscribe({
      next: (res) => {
        this.ipList = JSON.parse(JSON.stringify(res));
        console.log('Recieved Data from backend:: ', this.ipList);
        this.isDataLoaded = true;
      },
      error: (err) => console.error(err),
      complete: () => console.info('Post Request completed')
    });
  }

    // this.service.getDestIps(reqData).subscribe(
    //   (res) => {
    //     this.ipList = JSON.parse(JSON.stringify(res));
    //     // console.log('Got Ress::', this.ipList);
    //     this.isSubmitted = false;
    //     this.isDataLoaded = true;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
}
