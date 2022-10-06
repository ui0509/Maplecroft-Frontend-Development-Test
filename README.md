# Maplecroft Frontend Development Test

## Quick Start

```
npm install
npm start
```
## for test
ng test

## Tasks

Please find below answer for each task.

* Some countries do not have scores shown for some reason even though the API response includes those scores. In particular the client needs France and Norway to work, you need to make a change so that the scores/colour coding for those countries work.
* answer ->  I did some data changes in data file present in assets folder ('assets/ne_110m_admin_0_countries.json') because for France and Norway we were getting "-99" in "ISO_A2" field. This is the reason it was unable to identify country code (string) from other json present in assets folder i.e data.json

* Currently the API call is done from AppComponent, we would like this to be in a separate service.
* answer -> made Appservice file and injected into compoenent.

* The data includes an entitled boolean, we would like all countries where entitled is false to not have scores/colours displayed on the globe.
* answer -> created Show flag and applied check inside showDetails().

* Implement tests for your new data service and ensure existing tests work. (This application uses Jasmine/Karma, however feel free to convert it to Jest if you wish)
* answer :spec file are working for service and component both. changed some imports, title inside component file and created seprate service file.

* To help your Team Lead plan for future development of this application provide a brief list of issues and/or improvements that could be made to this application.

1. Data correction
2. creation of seprate D3 chart component 
3. error handling, server connection
4. Real time data integration
5. Enriched UI exprience like on hover it should data for particular contry over globe itself.
6. Can add some Pie chart or Bar chart for some more information
7. More code coverage or test reports.

## Submission of Completed Test
