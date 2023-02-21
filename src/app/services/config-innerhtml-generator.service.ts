import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigInnerhtmlGeneratorService {

  private innerHTML = '';

  constructor() { }

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

  scannerStatusUpdatedHTMLGen(scannerName: string, status: string): string {
    return `<span style="color: whitesmoke;"><b>${scannerName} has been set to ${status}</b></span>`
  }
}
