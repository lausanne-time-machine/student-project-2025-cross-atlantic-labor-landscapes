import { Flex, Group, Text } from "@mantine/core"

interface ColorBarProps {
    height: number,
    width: number,
    colorMap: (_: number) => string
}

export default function ColorBar({height, width, colorMap}:ColorBarProps){
    return (
        <Flex justify={"flex-start"} align={"flex-start"} direction={"column"} wrap={"nowrap"}>
            <svg width={width} height={height}>
                {Array.from(Array(width).keys()).map(x =>
                    <rect
                        key={x}
                        x={x}
                        y={0}
                        width={1}
                        height={height}
                        fill={colorMap(x/width)}
                    /> 
                )}
            </svg>
            <Group justify="space-between" w={width}>
                <Text size="xs">0</Text>
                <Text size="xs">1</Text>
            </Group>
        </Flex>
    )
}