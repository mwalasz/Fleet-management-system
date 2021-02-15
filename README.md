# :truck: Fleet management system :car:

![GitHub](https://img.shields.io/github/license/mwalasz/Fleet-management-system) 
![Lines of code](https://img.shields.io/tokei/lines/github/mwalasz/Fleet-management-system) 
![GitHub language count](https://img.shields.io/github/languages/count/mwalasz/Fleet-management-system) 
![GitHub top language](https://img.shields.io/github/languages/top/mwalasz/Fleet-management-system)

## Thesis abstract

The aim of the thesis was to create a web application and a complementary mobile application that enable the development of the multi-vehicle management process. In the era of ever-increasing demand for means of transport, controlling them becomes more and more difficult. The author proposes a system that facilitates tracking of basic information about vehicles, as well as tools for keeping statistics related to their operating costs. The proposed solutions can significantly increase the profits and effectiveness of organizations that base their activities on the use of fleets consisting of many vehicles. The thesis presents an analysis of the topic, focuses on selected tools and technologies - justifying their choice. It demonstrates results of the implementation in the form of an overview of the functions available to the user from the level of both applications. 

## Description

The following repo contains one part of the fleet management system that I proposed. 
It consists of React web application and ASP.NET Core backend. 

The other part is React Native application for recording vehicles usage. Data from that mobile application is subsequently used to display routes for each vehicle. You can find it here: [Fleet management Mobile App](https://github.com/mwalasz/Fleet-management-system-mobile).

### Functionality:
- storing data of vehicles usage
- assignment of vehicle usage rights and data
- calculating and displaying charts and statistics, such as:
  - cost of maintenance and cost of used fuel
  - mileage per used vehicle
  - max and average speed per vehicle
  - time spend in vehicle

## Screenshots
## Future plans: 
- [ ]  docker integration
- [ ]  language selection
- [ ]  OAuth authentication
- [ ]  pdf reports generation
