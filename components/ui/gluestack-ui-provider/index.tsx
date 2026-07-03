import { StyledProvider } from "@gluestack-style/react";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import React, { useEffect } from "react";
import { Appearance, ColorSchemeName, View, ViewProps } from "react-native";

export type ModeType = "light" | "dark" | "system";

export function GluestackUIProvider({
  mode = "system",
  config,
  ...props
}: {
  mode?: ModeType;
  config?: any;
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  useEffect(() => {
    Appearance.setColorScheme(mode as ColorSchemeName);
  }, [mode]);

  return (
    <StyledProvider config={config}>
      <View style={[{ flex: 1, height: "100%", width: "100%" }, props.style]}>
        <OverlayProvider>
          <ToastProvider>{props.children}</ToastProvider>
        </OverlayProvider>
      </View>
    </StyledProvider>
  );
}
