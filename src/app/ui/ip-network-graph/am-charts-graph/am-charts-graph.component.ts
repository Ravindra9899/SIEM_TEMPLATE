import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() graphData: Node;
  noOfchildToShow: Number;
  @Output() getNodeClicked: EventEmitter<{ip: string, level: number}>;

  constructor(private destIpService: DestinationIpsService) {
    this.graphData = new Node("Root", 0, 0, -1);
    this.noOfchildToShow = 50;
    this.getNodeClicked = new EventEmitter<{ip: string, level: number}>();
  }

  ngOnChanges() {
    console.log("Got graph data: ", this.graphData);
    if(this.root){
    this.root.dispose();}
    this.create_graph();
  }

  create_graph() {
    this.root = am5.Root.new("chartdiv");

    this.root.setThemes([am5themes_Animated.new(this.root)]);

    this.root?._logo?.dispose();

    let chart = this.root.container.children.push(
      am5.Container.new(this.root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: this.root.verticalLayout,
      })
    );

    let series = chart.children.push(
      am5hierarchy.ForceDirected.new(this.root, {
        singleBranchOnly: true,
        downDepth: 1,
        topDepth: 1,
        minRadius: 15,
        maxRadius: am5.percent(10),
        nodePadding: 0,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithStrength: 1,
        linkWithField: "linkWith",
      })
    );

    series?.get("colors")?.set("step", 3);

    series.nodes.template.events.on("click", (event) => {
      const clickedNode : any = event.target.dataItem?.dataContext;
      console.log("am-charts-graph::Got clicked on: ", clickedNode);
      this.getNodeClicked.emit({ip: clickedNode['name'], level: clickedNode['level']});
    });

    series.nodes.template.set("tooltipText", "{name}: {count}");

    series.data.setAll([this.graphData]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

    // this.root = root;
  }

  ngOnDestroy() {
    // if (this.root) {
    //   this.root.dispose();
    // }
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
