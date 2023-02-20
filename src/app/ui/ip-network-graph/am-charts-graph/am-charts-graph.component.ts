import { Component, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-am-charts-graph',
  templateUrl: './am-charts-graph.component.html',
  styleUrls: ['./am-charts-graph.component.css']
})
export class AmChartsGraphComponent{

  private root!: am5.Root;

  @Input() ips: string[] = [];
  @Input() inpIp: string = '';
  graphData: {}[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnChanges() {
    for (let ip of this.ips) {
      let ipStr = ip.substring(0, ip.indexOf('-'));
      let ipCount = ip.substring(ip.indexOf('-')+1);
      console.log("Graph Data::::",ip,"->",ipStr, "::", ipCount);
      this.graphData.push({ name: ipStr, children: [], value: 100, count: ipCount });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
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
      let data = {
        name: "Root",
        value: 0,
        children: [
          {
            name: this.inpIp,
            children: this.graphData,
            count: this.graphData.length
          }
      ]
      };

      let series = chart.children.push(
        am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          topDepth: 1,
          minRadius: 10,
          maxRadius: am5.percent(5),
          nodePadding: 5,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithStrength: 0.3,
          linkWithField: "linkWith",
          manyBodyStrength: -15,
          centerStrength: 0.5
        })
      );

      series?.get("colors")?.set("step", 3);

      series.nodes.template.set("tooltipText", "{name}: {count}");

      series.data.setAll([data]);
      series.set("selectedDataItem", series.dataItems[0]);

      // Make stuff animate on load
      series.appear(1000, 100);

      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }


}
