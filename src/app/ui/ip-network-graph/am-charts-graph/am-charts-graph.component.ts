import { Component, Input } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { Node } from './node.model';
import { DestinationIpsService } from 'src/app/services/destination-ips.service';

@Component({
  selector: 'app-am-charts-graph',
  templateUrl: './am-charts-graph.component.html',
  styleUrls: ['./am-charts-graph.component.css']
})
export class AmChartsGraphComponent{

  private root!: am5.Root;

  @Input() destinationIps: {ip: string, count: Number, children: {ip: string, count: Number, children: []}[]}[];
  @Input() sourceIpAddress: string;
  grapData: Node;
  // graphData: Record<any, any>[];
  destIpsCount: string;
  noOfchildToShow: Number;

  constructor(private destIpService: DestinationIpsService) {
    this.destinationIps = [];
    this.sourceIpAddress = '';
    this.grapData = new Node("Root", 0, 0);
    // this.graphData = [];
    this.destIpsCount = '';
    this.noOfchildToShow = 10;
  }

  ngOnChanges() {
    let level1NodesList: Node[] = [];

    if(this.destinationIps.length == 0){
      this.destIpsCount = ' Zero destination Ips';
    } else {
      this.destIpsCount = String(this.destinationIps.length);
      this.destinationIps = this.destinationIps.slice(0, Number(this.noOfchildToShow));
      for (let destIp of this.destinationIps) {
        let ipStr = destIp['ip'];
        let ipCount = destIp['count'];
        let ipChildren = destIp['children'];
        let level2NodesList: Node[] = [];
        for (let ipChild of ipChildren){
          let ipChildStr = ipChild['ip'];
          let ipChildCount = ipChild['count'];
          let level2Node = new Node(ipChildStr, 25, ipChildCount);
          level2NodesList.push(level2Node);
        }
        let level1Node = new Node(ipStr, 100, ipCount);
        for(let level2Node of level2NodesList) {
          level1Node.addNodeAsChild(level2Node);
        }
        level1NodesList.push(level1Node);
        // this.graphData.push({ name: ipStr, children: [], value: 100, count: ipCount});
      }
      console.log("Got graph data: ", this.grapData);
    }

    let level0Node = new Node(this.sourceIpAddress, 400, this.destIpsCount);

    for (let level1Node of level1NodesList){
      level0Node.addNodeAsChild(level1Node);
    }

    this.grapData.addNodeAsChild(level0Node);
  }

  ngAfterViewInit() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    root?._logo?.dispose();

    let chart = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      })
    );

    // Define data
    // let data = {
    //   name: "Root",
    //   value: 0,
    //   children: [
    //     {
    //       name: this.sourceIpAddress,
    //       children: this.graphData,
    //       count: this.destIpsCount
    //     }
    // ]
    // };

    let series = chart.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        topDepth: 1,
        minRadius: 10,
        maxRadius: am5.percent(5),
        nodePadding: 0,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithStrength: 1,
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.5
      })
    );

    series?.get("colors")?.set("step", 3);

    series.nodes.template.events.on("click", (event) => {
      const node : any = event.target.dataItem?.dataContext;
      console.log("am-charts-graph::Got clicked on: ", node);
      console.log(this.getlevelNIps(node['name']));
    });

    series.nodes.template.set("tooltipText", "{name}: {count}");

    series.data.setAll([this.grapData]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

    this.root = root;
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  getlevelNIps(sourceIpAddress: string){
    let destinaionIps: {}[] = [];
    let hasCausedError = false;
    let errorMesssage = '';

    this.destIpService.getDestinationIpsForAllIndices(sourceIpAddress).subscribe({
      next: (resObj) => {
        if(resObj.hasOwnProperty('data')){
          destinaionIps = resObj['data'];
          console.log("am-charts-graph::Recieved Data from backend: '", destinaionIps, "' for source IP: '", sourceIpAddress, "'");
          hasCausedError = false;
        } else {
          hasCausedError = true;
          errorMesssage = resObj['error'];
        }
      },
      error: (err) => {
        hasCausedError = true;
        errorMesssage = err;
      },
      complete: () => console.info("am-charts-graph::Post Request 'getDestinationIpsForAllIndices' completed")
    });

     return {
        'causedError': hasCausedError,
        'errorMesssage': errorMesssage,
        'destinaionIps': destinaionIps
      }

  }
}
