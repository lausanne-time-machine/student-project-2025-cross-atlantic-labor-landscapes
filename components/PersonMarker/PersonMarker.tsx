import { CircleMarker, Popup } from "react-leaflet";
import classes from './PersonMarker.module.css';

interface personProps {
    city: string;
    year: number;
    id: string;
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
            {/* <Paper shadow='md' style={{ margin: -16}} p='sm'> */}
                {person['name']}<br />{person['job_desc']}
            {/* </Paper> */}
        </Popup>
    </CircleMarker>
}