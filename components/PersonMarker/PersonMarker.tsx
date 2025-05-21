import { CircleMarker, Popup } from "react-leaflet";
import classes from './PersonMarker.module.css';
import { Anchor, Code, Text, Popover, ActionIcon, Flex } from "@mantine/core";
import { IconInfoCircle, IconInfoOctagon, IconInfoSmall } from "@tabler/icons-react";

export interface personProps {
    city: string;
    year: number;
    id: string;
    job: string;
    name: string;
    job_desc: string;
    line: string;
    longitude: number;
    latitude: number;
    page_nr?: number;
}

export function PersonMarker({ person }: { person: personProps }) {
    return <CircleMarker center={[person['latitude'], person['longitude']]} radius={8}
        className={classes.person_marker}>
        <Popup>
            {person.name}<br />
            <Code color='var(--mantine-color-amaranth-light)'>{person.job}</Code>{(person.job != person['job_desc']) && (' (' + person['job_desc'] + ')')}<br />
            {person.line}
            { person.city === 'new york' ? 
                (person.id.startsWith("1849-1850") || person.id.startsWith("1850-1851") ||
                person.id.startsWith("1878-1879") || person.id.startsWith("1879-1880")) ?
                    <>
                    <br />
                    <Flex align='center' gap={3}>
                    <Anchor target='_blank' size='xs'

                    href={
                        person.id.startsWith("1849-1850") ?
                        `https://iiif-prod.nypl.org/index.php?id=${56749940 + (person.page_nr ?? 0)}&t=w`
                        :
                        person.id.startsWith("1850-1851") ?
                        `https://iiif-prod.nypl.org/index.php?id=${56750464 + (person.page_nr ?? 0)}&t=w`
                        :
                        person.id.startsWith("1878-1879") ?
                        `https://iiif-prod.nypl.org/index.php?id=${56803305 + (person.page_nr ?? 0)}&t=w`
                        :
                        `https://iiif-prod.nypl.org/index.php?id=${56815725 + (person.page_nr ?? 0)}&t=w`
                    }>
                        see page {person.page_nr}</Anchor>
                        <Popover zIndex={800} width={200}>
                            <Popover.Target>
                                <ActionIcon variant='subtle' size='xs' radius='xl'><IconInfoOctagon/></ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Text size="xs">
                                    no guarantee that the page is
                                    correct, for navigation visit{' '}
                                    <Anchor target='_blank' href='https://digitalcollections.nypl.org/collections/new-york-city-directories#/?tab=about'>
                                    the new york public library</Anchor>
                                </Text>
                            </Popover.Dropdown>
                        </Popover>
                        </Flex>
                    </>
                    :
                    <>
                        <br/>
                        <Text size='xs'>no valid page number / id: {person.id}</Text>
                    </>
                :
                <>
                    <Text mt={0} size='xs'>document id: {person.id}</Text>
                </>
            }
        </Popup>
    </CircleMarker>
}


// 49/50
// https://iiif-prod.nypl.org/index.php?id=56749940&t=w
// 50/51
// https://iiif-prod.nypl.org/index.php?id=56750464&t=w
// 78/79
// https://iiif-prod.nypl.org/index.php?id=56803305&t=w
// 79/80
// https://iiif-prod.nypl.org/index.php?id=56815725&t=w
// 80/81
// https://iiif-prod.nypl.org/index.php?id=56813745&t=w