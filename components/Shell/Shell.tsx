import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconMap } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    const pathname = usePathname();

    return <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Text size='lg'>
              our nameee
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <NavLink
            href="/"
            label="home"
            leftSection={<IconHome size={16} stroke={1.5} />}
            active={pathname === '/'}
          />
          <NavLink
            href="/map"
            label="map"
            leftSection={<IconMap size={16} stroke={1.5} />}
            active={pathname === '/map'}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          { children }
        </AppShell.Main>
    </AppShell>
}