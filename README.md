# VCD 481 - iBeacon Application

An iOS application for trying [Ionic Mobile App Framework](http://ionicframework.com/) with [Cordova iBeacon Plugin](https://github.com/petermetz/cordova-plugin-ibeacon).

Made for the hint part of the puzzle game we're dealing in VCD 481 (Physical Interaction Design) Course.

---

**How it works?**

There are 4 levels of the puzzle and 2 smartphones, one is "the bomb", and the other one is the hinter.

Each level takes place near a specific iBeacon. So, in order to start solving the puzzle you need to get closer to the related iBeacon. This process is controlled by minor values of iBeacons.

Once the smartphones find the place, hinter will show the hint and "the bomb" will show the puzzle.

The puzzleLevel and statuses (isBeaconOneFound & isBeaconTwoFound) are being stored in a database, and [served with an API](https://github.com/zebrasinpyjamas/puzzleStatusAPI).