import { ComboboxItem, Paper, Stack, Text, Title } from "@mantine/core";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import people_ny from '../../data/ny_people.json';
import people_ls from '../../data/laus_people.json';
import professions from '../../data/some_professions.json';
import ColorBar from "../ColorBar/ColorBar";
import EllipseFromCov from "../Ellipse/EllipseFromCov";
import { PersonMarker, personProps } from "../PersonMarker/PersonMarker";
import MapSettings from "./MapSettings";
import { getColorScale, getEllipseData, lausanne, new_york } from "./util";

export default function Map({ city_name }: {
  city_name: "lausanne" | "new york"
}) {
  const [layerOpacity, setLayerOpacity] = useState(1);
  const [layer, setLayer] = useState<string>('berney');
  const [job, setJob] = useState<ComboboxItem | null>(null);
  const [nrGaussians, setNrGaussians] = useState<number>(0);
  const [lateData, setLateData] = useState(true);

  const colorScale = getColorScale();

  const city = city_name === 'lausanne' ? lausanne : new_york;
  let people = (city_name == "new york" ? people_ny : people_ls) as personProps[];
  const jobs = people.map(person => person.job).filter(
    (v, ix, arr) => arr.indexOf(v) === ix
  );
  let earlyYear =  city_name == "new york" ? 1850 : 1832;
  let lateYear = city_name == "new york" ? 1879 : 1885;

  return <>
    <MapContainer center={city.position} zoom={city.zoom} style={{ height: "100%", width: "100%" }}>
      {/* found here: https://leaflet-extras.github.io/leaflet-providers/preview/ */}
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {
        <TileLayer
          attribution=''
          url={`${layer}/{z}/{x}/{y}.png`}
          opacity={layerOpacity}
          tms
        />
      }
      {
        people.filter(
          person => (job ? person['job'] === job.value : false) &&
          (lateData ? person["year"] === lateYear : person["year"] === earlyYear)
        ).map((person, i) => 
        <PersonMarker person={person} key={i}/>)
      }
      {
        professions.filter(
          profession =>
            (job ? profession['job'] === job.value : false) &&
            (profession['city'] === city_name)
        ).flatMap((profession, i) => {

          let ellipseDataArr = getEllipseData(profession, nrGaussians, colorScale);
          // console.log(ellipseDataArr);
          return ellipseDataArr.map((ellipseData, j) =>
            <EllipseFromCov center={ellipseData.center} sigma={ellipseData.sigma} options={ellipseData.options} key={i * 10 + j} />
          )
        })
      }
      <Title tt="capitalize" lh='1'
        style={{ position: "absolute", left: 51, top: 8, zIndex: 800 }}>
        {city_name}
      </Title>
      <MapSettings jobs={jobs}
        layerOpacity={layerOpacity} setLayerOpacity={setLayerOpacity}
        layer={layer} setLayer={setLayer}
        job={job} setJob={setJob}
        nrGaussians={nrGaussians} setNrGaussians={setNrGaussians}
        lateData={lateData} setLateData={setLateData}
        city={city}
      />
      <Paper p='xs' withBorder style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 500 }}>
        <Stack gap={0}>
          <Text size="xs">Gaussian Weight</Text>
          <ColorBar width={150} height={15} colorMap={colorScale} />
        </Stack>
      </Paper>
    </MapContainer>
  </>
}