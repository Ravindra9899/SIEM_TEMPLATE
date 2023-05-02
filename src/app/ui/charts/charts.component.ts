import { Component, AfterViewInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { ScannerServiceService } from 'src/app/services/scanner-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  private countScanReportPerScanner: Record<string, any>[] = [];

  private root!: am5.Root;

  constructor(
    private scanService: ScannerServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) { }

  /**
   * The function is called when the component is initialized. It calls the
   * scanService.countScanReportsPerScanner() function which returns an observable. The observable is
   * subscribed to and the response is handled in the next and error functions. The response is then
   * used to create the chart
   */
  ngAfterViewInit(): void {
    this.scanService.countScanReportsPerScanner().subscribe({
      error: (err) => {
        console.log("Error in service subscribe of count scan reports per scanner");
        console.error(err);
      },
      next: (response) => {
        console.log("response count scan reports per scanner");

        console.log(response);
        if (
          response.hasOwnProperty("message") &&
          response["message"] != null &&
          response["message"] == "success" &&
          response.hasOwnProperty("data") &&
          response["data"] != null &&
          response["data"] != false &&
          typeof response["data"] == "object" &&
          Array.isArray(response["data"])
        ) {
          console.log("in if");
          if (Object.keys(response["data"]).length > 0) {

            this.countScanReportPerScanner = response["data"];

            console.log("scanReports on complete", this.countScanReportPerScanner);
            if (this.countScanReportPerScanner.length > 0) {
              this.createChart();
            }
          }
        } else {
          console.log("No response count scan reports per scanner");
        }
      },
      complete: () => {
        console.log("Subscribe count reports per scanner completed");

      }
    });
  }

  /**
   * The function creates a chart using the amCharts library
   */
  createChart(): void {
    console.log("chart create called");

    this.browserOnly(() => {
      let root = am5.Root.new('pie-chart-scanreport');
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);
      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });

      xRenderer.grid.template.setAll({
        location: 1
      });

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "API_Name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));

      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "count",
        sequencedInterpolation: true,
        categoryXField: "API_Name",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });

      xAxis.data.setAll(this.countScanReportPerScanner);

      series.data.setAll(this.countScanReportPerScanner);

      series.appear(1000);
      chart.appear(1000, 100);
    });
  }

  /* This is a function that is used to run the function only in the browser. */
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  /**
   * When the component is destroyed, we check if the chart exists, and if it does, we dispose of it
   */
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

}
