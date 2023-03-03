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

  //to save the recieved graphData from the parent
  @Input() graphData!: Node;
  noOfchildToShow: Number;
  @Output() getNodeClicked: EventEmitter<{ip: string, level: number}>;
  levelWiseNodeColorList: string[];

  constructor(private destIpService: DestinationIpsService) {
    this.noOfchildToShow = 50;
    this.getNodeClicked = new EventEmitter<{ip: string, level: number}>();
    //level wise color list
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

    //creating the graph in the div
    this.root = am5.Root.new("chartdiv");

    //setting up the theme
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    //removing the logo
    this.root?._logo?.dispose();

    //creating a container for the graph
    let chart = this.root.container.children.push(
      am5.Container.new(this.root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: this.root.verticalLayout
      })
    );

    //setting of the graph
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

    //setting the properties of the text inside circles
    series.labels.template.setAll({
      fill: am5.color("rgb(10,10,20)"),
      fontWeight: "bold"
    })

    //setting the color of the circles
    series.circles.template.adapters.add("fill", (fill, target) => {
      //getting the node
      const node: any = target.dataItem?.dataContext;

      //getting the color from the list to fill the color level wise
      const color = this.levelWiseNodeColorList[(node['level']+1) % this.levelWiseNodeColorList.length];
      return am5.color(color);
    });

    //making the circles a little transparent
    series.circles.template.setAll({
      fillOpacity: 0.8
    });

    //making the circle full opaque on hover
    series.circles.template.states.create("hover", {
      fillOpacity: 1
    });

    //setting the link length
    series.links.template.set("distance", 1.5);

    //putting an event while clicking on the node
    series.nodes.template.events.on("click", (event) => {
      const clickedNode : any = event.target.dataItem?.dataContext;
      console.log("Got clicked on: ", clickedNode);
      //if a node is already clicked/childrenAlreadyfetched
      if(!clickedNode['childrenAlreadyFetched']){
        console.log("Fetching children for: ", clickedNode);
        //emitting an event to parent with the node data
        this.getNodeClicked.emit({ip: clickedNode['name'], level: clickedNode['level']});
      }
    });

    //setting the tool-tip-text
    //in the {}, the properties of the node can be written
    series.nodes.template.set("tooltipText", "{name}: {count}");

    //finally putting the data into the graph
    series.data.setAll([this.graphData]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

  }
}
