import { handoutsTypes } from "@/modules/Board/components/Handouts/data";

export function getHandoutIconByType(type: string): string | undefined {
  const match = handoutsTypes.find((item) => item.type === type);
  return match?.icon;
};
