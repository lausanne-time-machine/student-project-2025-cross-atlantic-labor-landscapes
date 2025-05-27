import { ActionIcon, Checkbox, ComboboxItem, Group, Input, Popover, SegmentedControl, Select, Slider, Stack, Switch, Text } from "@mantine/core";
import { IconMapCog } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cityProps, profProps } from "./util";
import professions from '../../data/professions.json';

interface settingsProps {
    jobs: string[]
    layerOpacity: number
    setLayerOpacity: Dispatch<SetStateAction<number>>
    layer: string
    setLayer: Dispatch<SetStateAction<string>>
    job: ComboboxItem | null
    setJob: Dispatch<SetStateAction<ComboboxItem | null>>
    nrGaussians: number
    setNrGaussians: Dispatch<SetStateAction<number>>
    lateData: boolean
    setLateData: Dispatch<SetStateAction<boolean>>
    city: cityProps
    early: number
    late: number
}

export default function MapSettings(props: settingsProps) {
    const { jobs, layerOpacity, setLayerOpacity,
        layer, setLayer, job, setJob, city,
        nrGaussians, setNrGaussians, lateData,
        setLateData, early, late } = props;
    let year = (lateData ? late : early);

    const [earlylate, setEarlyLate] = useState(lateData ? 'late' : 'early');

    useEffect(() => setLateData(earlylate == 'late'), [earlylate])

    return <Group gap='sm' style={{ position: "absolute", right: 10, top: 10, zIndex: 800 }}>
        <SegmentedControl
            size='sm'
            value={earlylate}
            onChange={setEarlyLate}
            data={[{ value: 'early', label: early }, { value: 'late', label: late, disabled: city.name === "lausanne" }]}
        />
        <Select
            data={Object.keys(professions[city.name]).map(job => ({ value: job, label: `${job} (${
                (((professions[city.name] as any)[job] as any)[year] as profProps)?.n??0
            })` }))}
            placeholder="filter by job"
            value={job ? job.value : null}
            onChange={(_value, option) => setJob(option)}
            clearable
            searchable
            styles={{
                dropdown: { zIndex: 801 }
            }}
        />
        <Popover
            // width={300}
            position="bottom-end"
            zIndex={800}
            withArrow
            closeOnClickOutside={false}
        >
            <Popover.Target>
                <ActionIcon variant="filled" aria-label="Settings" size='lg'>
                    <IconMapCog style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <Input.Wrapper label='Gaussians' description='Number of Gaussians'>
                    <Slider value={nrGaussians} onChange={setNrGaussians} min={0} max={4} step={1} disabled={job ? false : true}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 2, label: '2' },
                            { value: 4, label: '4' },
                        ]}
                        style={{ width: 200 }}
                        mb={32}
                    />
                </Input.Wrapper>
                {
                    (city.layers.length > 0) ?
                        <><Input.Wrapper label="Map Layer">
                            <Group>
                                <Checkbox checked={layer != ''} onChange={(event) => {
                                    event.currentTarget.checked ? setLayer(city.layers[0].name) : setLayer('')
                                }} />
                                <SegmentedControl
                                    value={layer}
                                    onChange={setLayer}
                                    data={city.layers.map(
                                        layer => ({
                                            value: layer.name,
                                            label: <Stack gap={0}>
                                                <Text tt='capitalize'>{layer.name}</Text>
                                                <Text size='xs'>{layer.year}</Text>
                                            </Stack>
                                        })
                                    )}
                                />
                            </Group>
                        </Input.Wrapper>
                            <Input.Wrapper description='Map Opacity' mt='sm'>
                                <Slider
                                    size='md'
                                    value={layerOpacity} onChange={setLayerOpacity} min={0} max={1} step={0.01}
                                    style={{ width: 200 }}
                                />
                            </Input.Wrapper>
                        </>
                        :
                        <Input.Wrapper label="Map Layer">
                            <Text c='dimmed' size='sm'>no layers for new york yet</Text>
                        </Input.Wrapper>
                }
            </Popover.Dropdown>
        </Popover>
    </Group>
}