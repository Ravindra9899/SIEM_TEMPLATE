// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  profileImgSrc: '/assets/img/avatar.png',
  noPrevieImg: '/assets/img/no-preview.jpeg',
  loadingPreviewImg: '/assets/img/loading-preview.gif',
  logDaysDifference: 365,
  requestProcessingImgUrl: 'assets/img/ajax-loader-big.gif',
  SUPERADMIN_ID: "5cdd52f59498d4b7e78745db",
  SUPERADMIN_ROLEID: "superadmin",
  ADMIN_ROLEID: "admin",
  AUDITOR_ROLEID: "auditor",
  ANALYST_ROLEID: "analyst",
  ENGINEER_ROLEID: "engineer",
  MANAGER_ROLEID: "manager",
  ELASTIC_TAGS_TO_REMOVE: ["_grokparsefailure", "beats_input_codec_plain_applied", "_geoip_lookup_failure", "_dateparsefailure", "4XX Client Errors", "3XX Redirection Errors", "5XX Server Errors", "beats_input_raw_event"],
  IPS_TO_REMOVE: ["::1", "-"],
  INDICES_TO_REMOVE: [".geoip_databases"],
  TOP_PORTS: [21, 22, 23, 25, 53, 80, 110, 119, 135, 137, 138, 139, 143, 443, 445, 993, 995, 1723, 3306, 5900, 8080],
  OPERATING_SYSTEMS: [
  ],
  ENCRYPTION_SECRET_KEY: "5IrJuKFa8zvOJkHq",
  FULL_WIDTH_PAGE_URLS: []
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
