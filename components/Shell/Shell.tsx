import { AppShell, Burger, Group, NavLink, Text, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconMap } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LightDarkToggle } from "../LightDarkToggle/LightDarkToggle";

export const BASE = "/student-project-2025-cross-atlantic-labor-landscapes";
export function Shell({ children }: { children: ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  const pathname = usePathname();

  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();

  return <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 200,
      breakpoint: 'sm',
      collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
    }}
    padding="md"
  >
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        <Text size='lg' fw='bold' c='space'>
          Cross-Atlantic Labor Landscapes
        </Text>
      </Group>
    </AppShell.Header>
    <AppShell.Navbar>
      <AppShell.Section grow>
        <NavLink
          href={`${BASE}/`}
          label="home"
          leftSection={<IconHome size={16} stroke={1.5} />}
          active={pathname === '/'}
        />
        <NavLink
          href={`${BASE}/map`}
          label="map"
          leftSection={<IconMap size={16} stroke={1.5} />}
          active={pathname === '/map'}
        />
      </AppShell.Section>
      <AppShell.Section style={{
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
      }} pt='sm' mx='md' mt='sm' mb='lg'>
        <Group grow>
          <LightDarkToggle />
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
    <AppShell.Main>
      {children}
    </AppShell.Main>
  </AppShell>
}