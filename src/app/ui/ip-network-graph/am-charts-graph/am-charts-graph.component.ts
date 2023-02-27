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
  levelWiseNodeColorList: string[];

  constructor(private destIpService: DestinationIpsService) {
    this.graphData = new Node("Root", 0, '', -1);
    this.noOfchildToShow = 50;
    this.getNodeClicked = new EventEmitter<{ip: string, level: number}>();
    this.levelWiseNodeColorList = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
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
        layout: this.root.verticalLayout,
      })
    );

    let series = chart.children.push(
      am5hierarchy.ForceDirected.new(this.root, {
        singleBranchOnly: false,
        downDepth: 1,
        topDepth: 1,
        // nodePadding: 0,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithStrength: 1,
        linkWithField: "linkWith",
      })
    );

    series.circles.template.adapters.add("fill", (fill, target) => {
      const node: any = target.dataItem?.dataContext;
      const color = this.levelWiseNodeColorList[(node['level']+1) % this.levelWiseNodeColorList.length];
      return am5.color(color);
    });

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
