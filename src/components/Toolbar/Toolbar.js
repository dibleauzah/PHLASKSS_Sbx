import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ReactComponent as ResourceIcon} from '../icons/ResourceIcon.svg'
import {ReactComponent as WaterIcon} from '../icons/WaterIcon.svg'
import {ReactComponent as ContributeIcon} from '../icons/ContributeIcon.svg'
import styles from "./Toolbar.module.scss";
<<<<<<< HEAD

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
=======
import phlaskImg from "../images/PHLASK Button.png";

import {ReactComponent as ResourceIcon} from '../icons/ResourceIcon.svg'
import {ReactComponent as WaterIcon} from '../icons/WaterIcon.svg'
import {ReactComponent as ContributeIcon} from '../icons/ContributeIcon.svg'
import { isMobile } from "react-device-detect";
import { AddResourceModal } from "../AddResourceModal";

import FoodIcon from "../icons/FoodIcon";
import DesktopWaterIcon from "../icons/DesktopWaterIcon";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// Actual Magic: https://stackoverflow.com/a/41337005
// Distance calculates the distance between two lat/lon pairs
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

// Takes an array of objects with lat and lon properties as well as a single object with lat and lon
// properties and finds the closest point (by shortest distance).
function getClosest(data, userLocation) {
  // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
  // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
  var distances = data.map((org, index) => {
    return {
      lat: org["lat"],
      lon: org["lon"],
      organization: org["organization"],
      address: org["address"],
      distance: distance(
        userLocation["lat"],
        userLocation["lon"],
        org["lat"],
        org["lon"]
      ),
      id: index
    };
  });
  var minDistance = Math.min(...distances.map(d => d.distance));

  var closestTap = {
    organization: "",
    address: "",
    lat: "",
    lon: "",
    id: ""
  };

  for (var i = 0; i < distances.length; i++) {
    if (distances[i].distance === minDistance) {
      closestTap.lat = distances[i].lat;
      closestTap.lon = distances[i].lon;
      closestTap.organization = distances[i].organization;
      closestTap.address = distances[i].address;
      closestTap.id = distances[i].id;
    }
  }

  return closestTap;
}

function getCoordinates() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function Toolbar(props) {
  const [value, setValue] = React.useState(0);

  function switchType(type) {
    if (props.phlaskType !== type) {
      props.togglePhlaskType(type);
      handleGA(type);
    }
  }

  function handleGA(type) {
    ReactGA.event({
      category: `Toolbar`,
      action: "MapChangedTo",
      label: `${type}`
    });
  }

  function setClosest() {
    const data =
      props.phlaskType === PHLASK_TYPE_WATER
        ? props.allTaps
        : props.allFoodOrgs;
    const closest = getClosest(data, {
      lat: props.userLocation.lat,
      lon: props.userLocation.lng
    });
    const place = new Promise(() => {
      props.setSelectedPlace(closest.id);
    });
    place
      .then(
        props.setMapCenter({
          lat: closest.lat,
          lng: closest.lon
        })
      )
      .then(props.toggleInfoWindow(true));
  }

  return (
    <>
    ${!isMobile ? (
    <div
      className={`${styles.toolbar} ${
        isMobile ? styles.mobileToolbar : styles.desktopToolbar
      }`}
    >
      {!isMobile && (
        <h3
          className={`
            ${styles.title}
            ${
              props.phlaskType === PHLASK_TYPE_WATER
                ? styles.waterTitle
                : styles.foodTitle
            }
          `}
        >
          {props.phlaskType === PHLASK_TYPE_WATER ? "Water Map" : "Food Map"}
        </h3>
      )}
      <div className={styles.filterButton}>
        <button aria-label="show filters">
          {props.phlaskType === PHLASK_TYPE_WATER ? <Filter /> : <FoodFilter />}
        </button>
      </div>
      <button
        className={`${styles.toolbarButton} ${
          styles.waterButton
        } ${props.phlaskType !== PHLASK_TYPE_WATER && styles.disabled}`}
        onClick={() => {
          switchType(PHLASK_TYPE_WATER);
        }}
      >
        <DesktopWaterIcon />
      </button>
      {isMobile && (
        <button className={styles.closestTapButton} onClick={setClosest}>
          <img
            className="img"
            src={phlaskImg}
            alt=""
          ></img>
        </button>
      )}
      <button
        className={`${styles.toolbarButton} ${
          styles.foodButton
        } ${props.phlaskType === PHLASK_TYPE_WATER && styles.disabled}`}
        onClick={() => {
          switchType(PHLASK_TYPE_FOOD);
>>>>>>> 1e4260eb6fd42dff2e065dece4f22162eac74d26
        }}

      >
<<<<<<< HEAD
        <BottomNavigationAction label="Resources" icon={<ResourceIcon className={styles.resourceButton} />} />
        <BottomNavigationAction label="PHLASK" icon={<WaterIcon className={styles.PHLASKButton} />} />
        <BottomNavigationAction label="Contribute" icon={<ContributeIcon className={styles.contributeButton} />} />
      </BottomNavigation>
    </Box>
=======
        <FoodIcon />
      </button>
      <AddResourceModal />
    </div>
    ): (
      // MOBILE VERSION OF THE TOOLBAR (V2)
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}

        >
          <BottomNavigationAction label="Resources" icon={<ResourceIcon className={styles.resourceButton} />} />
          <BottomNavigationAction label="PHLASK" icon={<WaterIcon className={styles.PHLASKButton} />} />
          <BottomNavigationAction label="Contribute" icon={<ContributeIcon className={styles.contributeButton} />} />
        </BottomNavigation>
      </Box>
    )}
    </>
>>>>>>> 1e4260eb6fd42dff2e065dece4f22162eac74d26
  );
}

