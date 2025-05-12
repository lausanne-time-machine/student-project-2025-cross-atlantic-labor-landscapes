import { Autocomplete, ComboboxItem, Flex, Group, Select, Slider, Switch, Title, Text } from "@mantine/core";

import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import * as d3 from 'd3';

import people from '../../data/some_people.json';
import { PersonMarker } from "../PersonMarker/PersonMarker";
import professions from '../../data/some_professions.json';
import EllipseFromCov from "../Ellipse/EllipseFromCov";
import ColorBar from "../ColorBar/ColorBar";


interface MapProps {
  position: LatLngExpression
  zoom: number
  city : "lausanne" | "new york"
}

const colorScale = d3.scaleSequential()
    .domain([0, 1])
    .interpolator(d3.interpolateReds);

function getEllipseData(profession:any, nrGaussians: number){

  if (nrGaussians < 1){
    console.log("can't load data without nr of gaussians selected")
    return []
  }
  let dataArr = []
 
  for (let i = 0; i < nrGaussians; i++){
    
    let color = colorScale(profession["priors_"+nrGaussians][i])
    dataArr.push({
      center: profession["mu_"+nrGaussians][i],
      sigma: profession["sigma_"+nrGaussians][i],
      options:{
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        opacity: 0.3,
        weight: 2,
      }
    })
  }
  return dataArr
}

export default function Map({ position, zoom, city}: MapProps) {
  const [opac, setOpac] = useState(1);
  const [map32, set32] = useState(true);
  const [job, setJob] = useState<ComboboxItem | null>(null);
  const [nrGaussians, setNrGaussians] = useState(0)


  return <>
    <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%"}}>
      {/* found here: https://leaflet-extras.github.io/leaflet-providers/preview/ */}
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {
        map32 ?
        <TileLayer
          attribution=''
          url="berney/{z}/{x}/{y}.png"
          opacity={opac}
          tms
        />
        :
        <TileLayer
          attribution=''
          url="sprengler/{z}/{x}/{y}.png"
          opacity={opac}
          tms
        />
      }
      {
        people.filter(
          person => job ? person['job'] === job.value : true
        ).map((person, i) => 
        <PersonMarker person={person} key={i}/>)
      }
      {
        professions.filter(
          profession => 
            (job ? profession['job'] === job.value : false) &&
            (profession['city'] === city)
        ).flatMap((profession, i) => {
          
          let ellipseDataArr = getEllipseData(profession, nrGaussians);
          // console.log(ellipseDataArr);
          return ellipseDataArr.map((ellipseData, j) =>
            <EllipseFromCov center={ellipseData.center} sigma={ellipseData.sigma} options={ellipseData.options} key={i*10 + j}/>
          )
        })
      }
      <Title tt="capitalize"
        style={{ position: "absolute", left: 60, top: 10, zIndex: 1000}}>
        {city}
      </Title>
      <Select
        data={[{ value: 'architecte', label: 'architecte' }, { value: 'charcuti.', label: 'charcuti.' }]}
        placeholder="filter by job"
        value={job ? job.value : null}
        onChange={(_value, option) => setJob(option)}
        clearable
        searchable
        style={{ position: "absolute", right: 10, top: 10, zIndex: 1000}}
        styles={{
          dropdown: { zIndex: 1000 }
        }}
      />
    </MapContainer>
    <Group>
      <Slider value={opac} onChange={setOpac} min={0} max={1} step={0.05}
        label='old map opacity'
        style={{ zIndex: 1000, width: 100 }}
        />
      <Switch
        checked={map32}
        label='berney / sprengler'
        onChange={(event) => set32(event.currentTarget.checked)}
      />
      <Slider value={nrGaussians} onChange={setNrGaussians} min={0} max={4} step={1} disabled={job?false:true}
        label='nr gaussians'
        marks={[
          { value: 0, label: '0' },
          { value: 2, label: '2' },
          { value: 4, label: '4' },
        ]}
        style={{ zIndex: 1000, width: 100 }}
        />
      <Flex justify={"flex-start"} align={"flex-start"} direction={"column"} wrap={"nowrap"}>
        <Text size="xs">prior colormap</Text>
        <ColorBar width={150} height={15} colorMap={colorScale}/>
      </Flex>
    </Group>
  </>
}