import { Container, Flex, NativeSelect, Title } from '@mantine/core';
// import { Map } from '../components/Map/Map';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function MapPage() {
    const Map = useMemo(() => dynamic(
    () => import('../components/Map/Map'),
    { 
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
    ), [])

      return (
        <Flex direction={"row"} gap="lg" >
            <Flex h={"750px"} w={"100%"} direction={"column"} gap={"lg"}>
                <Map position={[46.522, 6.633]} zoom={16} city='lausanne' />
            </Flex>

            <Flex h={"750px"} w={"100%"} direction={"column"} gap={"lg"}>
                <Map position={[46.522, 6.633]} zoom={16} city='new york' />
            </Flex>
        </Flex>
    )
}