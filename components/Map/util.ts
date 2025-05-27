import * as d3 from 'd3';
import { useMantineTheme } from "@mantine/core";
import { LatLngExpression } from 'leaflet';

export function getColorScale() {

    const theme = useMantineTheme();
    const colorScale = d3.scaleSequential()
        .domain([0, 1])
        .interpolator(d3.interpolate(theme.white, theme.colors.space[7]));

    return colorScale;
}


export function getEllipseData(profession: any, nrGaussians: number, colorScale: d3.ScaleSequential<string, never>) {

    if (nrGaussians < 1) {
        console.log("can't load data without nr of gaussians selected")
        return []
    }
    let dataArr = []

    for (let i = 0; i < nrGaussians; i++) {

        let color = colorScale(profession["priors_" + nrGaussians][i])
        dataArr.push({
            center: profession["mu_" + nrGaussians][i],
            sigma: profession["sigma_" + nrGaussians][i],
            options: {
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

export interface cityProps {
    name: "lausanne" | "new york"
    zoom: number
    position: LatLngExpression
    layers: {
        name: string
        year: number
    }[]
}

export interface profProps {
    n: number
    priors_1: number[]
    mu_1: number[][]
    sigma_1: number[][][]
    priors_2: number[]
    mu_2: number[][]
    sigma_2: number[][][]
    priors_3: number[]
    mu_3: number[][]
    sigma_3: number[][][]
    priors_4: number[]
    mu_4: number[][]
    sigma_4: number[][][]
}

export const lausanne: cityProps = {
    name: "lausanne",
    zoom: 16,
    position: [46.522, 6.633],
    layers: [
        {name: 'berney', year: 1832},
        {name: 'sprengler', year: 1871}
    ]
}

export const new_york: cityProps = {
    name: "new york",
    zoom: 13,
    position: [40.73, -73.99],
    layers: []
}