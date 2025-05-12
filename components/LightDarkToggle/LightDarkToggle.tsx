import { ActionIcon, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function LightDarkToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    return (
        <ActionIcon
          onClick={() => toggleColorScheme()}
          style={{
            backgroundColor:
              colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: colorScheme === 'dark' ? theme.colors.amaranth[4] : theme.colors.space[6],
          }}
        >
          {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
    );
  }