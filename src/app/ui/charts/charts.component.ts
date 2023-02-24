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
          response.hasOwnProperty("message") && response["message"] != null && response["message"] == "success" &&
          response.hasOwnProperty("data") && response["data"] != null && response["data"] != false
        ) {
          console.log("in if");
          if (Object.keys(response["data"]).length > 0) {
            for (let i = 0; i < Object.keys(response["data"]).length; i++) {
              console.log();
              let scannerName  =Object.keys(response["data"])[i];
              let scannerCount = response["data"][scannerName];

              console.log(`console ${scannerName} ${scannerCount}`);
              this.countScanReportPerScanner.push(
                {
                  "API_Name": scannerName,
                  "count": scannerCount
                }
              );
            }

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
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          height: new am5.Percent(100),
        })
      );
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          categoryField: "API_Name",
          valueField: "count"
        })
      );

      series.labels.template.setAll({
        maxWidth: 150,
        oversizedBehavior: "wrap" // to truncate labels, use "truncate"
      });

      series.data.setAll(this.countScanReportPerScanner);

      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
      }));
      
      legend.data.setAll(series.dataItems);
      console.log(series);

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
