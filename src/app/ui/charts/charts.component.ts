import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";

import { ScannerServiceService } from 'src/app/services/scanner-service.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  private countScanReportPerScanner: Record<string, any>[] = [];

  @ViewChild('pieChart', { static: true }) pieChartEl: ElementRef | undefined;


  constructor(private scanService: ScannerServiceService) { }

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

  createChart(): void {
    console.log("chart create called");

    let root = am5.Root.new(this.pieChartEl!.nativeElement);
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "API_Name",
        valueField: "count"
      })
    );

    series.data.setAll(this.countScanReportPerScanner);

    console.log(series)
  }

}
