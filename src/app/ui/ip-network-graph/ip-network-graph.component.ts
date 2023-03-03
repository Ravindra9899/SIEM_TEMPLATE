import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { DestinationIpsService } from 'src/app/services/destination-ips.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { ActivatedRoute } from '@angular/router';
import { Node } from './am-charts-graph/node.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ip-network-graph',
  templateUrl: './ip-network-graph.component.html',
  styleUrls: ['./ip-network-graph.component.css']
})
export class IpNetworkGraphComponent implements OnInit{
  //will save the value of source-ip-address
  inputIpAddr: string;

  //will be true only when graph data processing is completed
  isDataLoaded: boolean;

  //will be true if any error is caused
  hasCausedError: boolean;

  //will contain the error message, in case any error occured
  errorMesssage: string;

  //will contain the pointer to the root node of graph data
  amChartsGraphData : Node;

  //will contain the no of children to be fethed from the backend
  amChartsGraphNoOfChildren: string;

  constructor(
    private destIpService: DestinationIpsService,
    private route: ActivatedRoute,
    private validator: ValidatorService
    ) {
    this.inputIpAddr = '';
    this.isDataLoaded = false;
    this.hasCausedError = false;
    this.errorMesssage = '';
    this.amChartsGraphData = new Node("Root", 0, '', -1);
    this.amChartsGraphNoOfChildren = '15';
  }

  ngOnInit(): void {

    //Getting the value of the ip address from URL
    this.route.queryParams.subscribe(params => {
      if(params.hasOwnProperty('ip')){
        const ip = params['ip'];
        console.log("ip-netwrok-graph::Got IP from URL param : '", ip, "'");
        if(this.validator.isValidIpAddress(ip)){
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

      //requesting the backend
      this.destIpService.getDestinationIpsForAllIndices(this.inputIpAddr, this.amChartsGraphNoOfChildren).subscribe({
        next: (resObj) => {
          if(resObj.hasOwnProperty('data')){
            let ipObjList = resObj['data'];
            console.log("Recieved Data from backend: '", ipObjList, "'");

            //Generating the graph having 0th level and first level of the nodes
            //level0Node -> visible root node of the tree
            let level0Node = new Node(this.inputIpAddr, 400, 'Source Ip Address', 0);

            //pusing the ips(got from backend) ad level1 nodes to level0Node children array
            level0Node.addIpObjListAsChildren(ipObjList);

            //component will be reloaded, so clearing the root(of the whole graph)
            this.amChartsGraphData.children = [];

            //Now, putting the root node of the tree as child of the graph
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
        complete: () => console.info("Post Request 'getDestinationIpsForAllIndices' completed")
      });
    }
  }

  //Will be triggered when user will press enter in the input for noOfChildren
  onNoOfChildrenEnter(event: any) {

    //getting the value entered
    let enteredValue = event.target.value.trim();

    //verifiying the entered value
    if(enteredValue.length == 0){
      this.hasCausedError = true;
      this.errorMesssage = 'Please Enter a value.';
    } else {
      if(!isNaN(enteredValue)){
        //putting the value in the property
        this.amChartsGraphNoOfChildren = enteredValue;
      } else {
        if(enteredValue.toUpperCase() == 'ALL'){
          this.amChartsGraphNoOfChildren = 'ALL';
        } else {
          this.hasCausedError = true;
          this.errorMesssage = 'Please Enter "all" or any other numeric value.';
        }
      }
    }

    //reloading the component with entered value
    this.ngOnInit();
  }

  //will be triggered when a node is clicked
  getNodeClickedHandler(clickedNode: {ip: string, level: number}){
    this.isDataLoaded = false;
    this.destIpService.getDestinationIpsForAllIndices(clickedNode.ip, this.amChartsGraphNoOfChildren).subscribe({
      next: (resObj) => {
        if(resObj.hasOwnProperty('data')){
          let ipObjList = resObj['data'];
          console.log("On clicking the ip: '", clickedNode.ip, "' and got childs: '", ipObjList, "'");

          //getting the current root of the tree
          let currentRoot = this.amChartsGraphData.children[0];

          //putting the children ip recieved as the children of the clicked node
          //and saving old root of the tree as new root, so that amcharts graph can be reloaded
          let newRoot = Node.addChildrenToGraph(currentRoot, ipObjList, clickedNode);

          //creating the new root(of the graph)
          let newAmChartsGraphData = new Node("root", 0, '', -1);

          //pushing the new root(of the tree) to the new root(of the graph)
          newAmChartsGraphData.children.push(newRoot);

          //updating the root(of the graph)
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
