import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigInnerhtmlGeneratorService {

  private innerHTML = '';

  constructor() { }

  /**
   * It takes in an object, and returns a string of HTML
   * @param api_data - This is the data that you want to display in the view.
   * @returns A string of HTML code.
   */
  virusTotalViewHtmlGenerator(api_data: Record<string, any>) {
    return `<h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
    <table>
    <tr>
    <th>API Key: </th><td>${api_data['config']['api_key']}</td>
    </tr>
    <tr>
    <th>Created :</th><td>${api_data['createdAt']}</td>
    </tr>
    <tr>
    <th>Updated :</th><td>${api_data['updatedAt']}</td>
    </tr>
    </table>`;

  }

  /**
   * It takes a scanner name and a status and returns a string that contains the scanner name and
   * status in a HTML span element
   * @param {string} scannerName - The name of the scanner that was updated
   * @param {string} status - string - The status of the scanner.
   * @returns A string
   */
  scannerStatusUpdatedHTMLGen(scannerName: string, status: string): string {
    return `<span style="color: whitesmoke;"><b>${scannerName} has been set to ${status}</b></span>`
  }
}
