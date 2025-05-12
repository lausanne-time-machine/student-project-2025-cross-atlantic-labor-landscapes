import { Anchor, Text, Title } from '@mantine/core';
import classes from './Dashboard.module.css';
import { BASE } from '../Shell/Shell';

export function Dashboard() {
  return (
    <>
      <Title className={classes.title} ta="center" mt='sm'>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'space', to: 'amaranth' }}>
          Cross-Atlantic<br/>Labor Landscapes
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Welcome to our student project on spatial distribution of occupations in New York and Lausanne in the 19th century.
        <br/>
        Go on ahead and check out our interactive{' '}
        <Anchor href={`${BASE}/map`} size="lg">
          map
        </Anchor>
        .
      </Text>
    </>
  );
}
