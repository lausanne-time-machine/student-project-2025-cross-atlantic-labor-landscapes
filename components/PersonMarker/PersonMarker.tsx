import { CircleMarker, Popup } from "react-leaflet";
import classes from './PersonMarker.module.css';
import { Code } from "@mantine/core";

interface personProps {
    city: string;
    year: number;
    id: number;
    job: string;
    name: string;
    job_desc: string;
    line: string;
    longitude: number;
    latitude: number;
}

export function PersonMarker({ person }: { person: personProps }) {
    return <CircleMarker center={[person['latitude'], person['longitude']]} radius={8}
        className={classes.person_marker}>
        <Popup>
            {person['name']}<br />
            <Code color='var(--mantine-color-amaranth-light)'>{person['job']}</Code>{(person['job'] != person['job_desc']) && (' (' + person['job_desc'] + ')')}<br />
            {person['line']}
        </Popup>
    </CircleMarker>
}