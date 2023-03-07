import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigInnerhtmlGeneratorService {

  private innerHTML = '';

  constructor() { }

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

  // "Abuse IPDB",
  //   "AlienVault",
  //   "BOTVIJ.EU IP List",
  //   "Binary Defence Systems Banlist",
  //   "BruteForce Blocker",
  //   "CI Army List",
  //   "CIRCL BGP Ranking",
  //   "DigitalSide-API",
  //   "HoneyDB",
  //   "Maltiverse",
  //   "Virus Total",
  //   "Who Is IP Netblocks"

  scannerConfigViewHtmlGenerator(apiName: string, api_data: Record<string, any>): string {
    switch (apiName) {
      case "Abuse IPDB":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>API Key: </th>
              <td>${api_data['config']['Key']}</td>
            </tr>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "AlienVault":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>API Key: </th>
              <td>${api_data['config']['api_otx_key']}</td>
            </tr>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "BOTVIJ.EU IP List":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "Binary Defence Systems Banlist":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "BruteForce Blocker":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
            <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "CI Army List":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "CIRCL BGP Ranking":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "DigitalSide-API":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
            </tr>
            <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "HoneyDB":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>API ID: </th>
              <td>${api_data['config']['api_id']}</td>
            </tr>
            <tr>
              <th>API Key: </th>
              <td>${api_data['config']['api_key']}</td>
            </tr>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
              </tr>
              <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "Maltiverse":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>Auth Token: </th>
              <td>${api_data['config']['bearerToken']}</td>
            </tr>
            <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
              </tr>
              <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "Virus Total":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>API Key: </th>
              <td>${api_data['config']['api_key']}</td>
              </tr>
              <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
              </tr>
              <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      case "Who Is IP Netblocks":
        return `
          <h1 style="color: whitesmoke;">${api_data['API_Name']}</h1>
          <table>
            <tr>
              <th>API Key: </th>
              <td>${api_data['config']['apiKey']}</td>
              </tr>
              <tr>
              <th>Created :</th>
              <td>${new Date(api_data['createdAt'])}</td>
              </tr>
              <tr>
              <th>Updated :</th>
              <td>${new Date(api_data['updatedAt'])}</td>
            </tr>
          </table>
          `;

      default: return ``;
    }
  }
}
