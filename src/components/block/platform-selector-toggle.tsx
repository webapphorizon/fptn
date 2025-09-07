"use client";

import { useState } from "react";
import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { usePlatform } from "~/context/platform-selector-context";

const PlatformSelectorToggle = () => {
  const { selectedPlatform, setSelectedPlatform } = usePlatform();

  const platforms = [
    { id: "android", icon: FaAndroid, name: "Android" },
    { id: "windows", icon: FaWindows, name: "Windows" },
    { id: "linux", icon: FaLinux, name: "Linux" },
    { id: "macos", icon: FaApple, name: "macOS" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <ToggleGroup
        type="single"
        value={selectedPlatform}
        onValueChange={(value) => value && setSelectedPlatform(value)}
        className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
      >
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <ToggleGroupItem
              key={platform.id}
              value={platform.id}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex h-auto flex-col items-center gap-2 rounded-md p-4"
            >
              <IconComponent className="text-2xl" />
              <span className="text-sm md:text-base">{platform.name}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};

export default PlatformSelectorToggle;
