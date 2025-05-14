import { Anchor, Center, Text, Timeline, Title } from '@mantine/core';
import classes from './Dashboard.module.css';
import { BASE } from '../Shell/Shell';
import { IconBrain, IconFilter, IconHome, IconMap } from '@tabler/icons-react';

export function Dashboard() {
  return (
    <>
      <Title className={classes.title} ta="center" mt='sm'>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'space', to: 'amaranth' }}>
          Cross-Atlantic<br />Labor Landscapes
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Welcome to our student project on spatial distribution of occupations in New York and Lausanne in the 19th century.
        <br />
        Go on ahead and check out our interactive{' '}
        <Anchor href={`${BASE}/map`} size="lg">
          map
        </Anchor>
        .
      </Text>
      <Title order={1} ta='center' c='space'>Data Story</Title>
      <Center mt='sm'>
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<IconHome size={12} />} title="Welcome">
            <Text c="dimmed" size="sm">Welcome to the page</Text>
            <Text size="xs" mt={3}>let's get going</Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconMap size={12} />} title="Navigate to the map">
            <Text c="dimmed" size="sm">you will find the interactive site <Anchor href={`${BASE}/map`}>here</Anchor></Text>
            <Text size="xs" mt={3}>see you</Text>
          </Timeline.Item>

          <Timeline.Item title="" bullet={<IconFilter size={12} />} lineVariant="dashed">
            <Text c="dimmed" size="sm">Find a job, and year</Text>
            <Text size="xs" mt={3}>filter ahead</Text>
          </Timeline.Item>

          <Timeline.Item title="Analysis" bullet={<IconBrain size={12} />}>
            <Text c="dimmed" size="sm">Now think and analyse!</Text>
            <Text size="xs" mt={3}>hmm</Text>
          </Timeline.Item>
        </Timeline>
      </Center>
    </>
  );
}
