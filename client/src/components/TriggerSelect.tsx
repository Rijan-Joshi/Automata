import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { metaData, NodeKind } from "./CreateWorkFlow";
import { useState } from "react";

PERMITTED_TRIGGER: [] = [
  {
    id: 1,
    value: "Price",
    label: "Use it to set the price",
  },
  {
    id: 2,
    value: "Timer",
    label: "Use it to set the timer",
  },
  {
    id: 3,
    value: "HyperLiquid",
    label: "Use it to set the hyperliquid",
  },
  {
    id: 4,
    value: "Backpack",
    label: "Use it to set the backpack",
  },
  {
    id: 5,
    value: "Lighter",
    label: "Use it to set the lighter",
  },
];

export function TriggerSelect({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metaData: metaData) => void;
}) {
  const [triggerType, setTriggerType] = useState<NodeKind | undefined>();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Node</SheetTitle>
          <SheetDescription>
            Create new node here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Select
          onValueChange={(value) => {
            setTriggerType(value as NodeKind);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Triggers</SelectLabel>
              <SelectItem value="price-trigger">Price Trigger</SelectItem>
              <SelectItem value="timer-trigger">Timer Trigger</SelectItem>
              <SelectItem value="hyperliquid">Hyperliquid</SelectItem>
              <SelectItem value="backpack">Backpack</SelectItem>
              <SelectItem value="lighter">Lighter</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <SheetFooter>
          <Button
            type="submit"
            onClick={() => {
              if (triggerType) {
                onSelect(triggerType, {});
              }
            }}
          >
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
