import { Flex } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import classes from './MapsFlex.module.css';


export function MapsFlex() {
    const Map = useMemo(() => dynamic(
        () => import('../Map/Map'),
        { 
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
        ), [])

        
    return <Flex className={classes.outer} gap="lg" >
        <Flex className={classes.inner} direction={"column"} gap={"lg"}>
            <Map city_name='lausanne' />
        </Flex>

        <Flex className={classes.inner} direction={"column"} gap={"lg"}>
            <Map city_name='new york' />
        </Flex>
    </Flex>
}