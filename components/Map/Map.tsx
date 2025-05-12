import { Autocomplete, ComboboxItem, Group, Select, Slider, Switch, Title } from "@mantine/core";

import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import people from '../../data/some_people.json';
import { PersonMarker } from "../PersonMarker/PersonMarker";

interface MapProps {
  position: LatLngExpression
  zoom: number
  city : "lausanne" | "new york"
}

export default function Map({ position, zoom, city}: MapProps) {
  const [opac, setOpac] = useState(1);
  const [map32, set32] = useState(true);
  const [job, setJob] = useState<ComboboxItem | null>(null);

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
    </Group>
  </>
}