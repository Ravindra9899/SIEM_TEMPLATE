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

  @Input() graphData!: Node;
  noOfchildToShow: Number;
  @Output() getNodeClicked: EventEmitter<{ip: string, level: number}>;
  levelWiseNodeColorList: string[];

  constructor(private destIpService: DestinationIpsService) {
    // this.graphData = new Node("Root", 0, '', -1);
    this.noOfchildToShow = 50;
    this.getNodeClicked = new EventEmitter<{ip: string, level: number}>();
    this.levelWiseNodeColorList = ['rgb(144, 177, 216)', 'rgb(43, 144, 143)', 'rgb(169, 255, 151)', 'rgb(255, 116, 116)', 'rgb(119,152,191)'];
  }

  ngOnChanges() {
    console.log("Got graph data: ", this.graphData);
    if(this.root){
      this.root.dispose();
    }
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
        layout: this.root.verticalLayout
      })
    );

    let series = chart.children.push(
      am5hierarchy.ForceDirected.new(this.root, {
        singleBranchOnly: false,
        topDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name"
      })
    );

    series.labels.template.setAll({
      fill: am5.color("rgb(10,10,20)"),
      fontWeight: "bold"
    })

    series.circles.template.adapters.add("fill", (fill, target) => {
      const node: any = target.dataItem?.dataContext;
      const color = this.levelWiseNodeColorList[(node['level']+1) % this.levelWiseNodeColorList.length];
      return am5.color(color);
    });

    series.circles.template.setAll({
      fillOpacity: 0.8
    });

    series.circles.template.states.create("hover", {
      fillOpacity: 1
    });

    series.links.template.set("distance", 1.5);

    series.nodes.template.events.on("click", (event) => {
      const clickedNode : any = event.target.dataItem?.dataContext;
      console.log("am-charts-graph::Got clicked on: ", clickedNode);
      if(!clickedNode['childrenAlreadyFetched']){
        console.log("am-charts-graph::fetching children for: ", clickedNode);
        this.getNodeClicked.emit({ip: clickedNode['name'], level: clickedNode['level']});
      }
    });

    series.nodes.template.set("tooltipText", "{name}: {count}");

    series.data.setAll([this.graphData]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

  }
}
