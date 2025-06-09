import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

interface FilterComboboxProps {
	options: Array<{ value: string; label: string }>;
	placeholder: string;
	value: string;
	onValueChange: (value: string) => void;
	triggerClassName?: string;
	contentClassName?: string;
}

export function FilterCombobox({
	options,
	placeholder,
	value,
	onValueChange,
	triggerClassName,
	contentClassName,
}: FilterComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn("justify-between", triggerClassName || "w-[200px]")}
				>
					{value
						? options.find((option) => option.value === value)?.label
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn("p-0", contentClassName || "w-[200px]")}>
				<Command>
					<CommandInput
						placeholder={`Search ${placeholder
							.toLowerCase()
							.replace("select ", "")
							.replace("...", "")}...`}
					/>
					<CommandList>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value} // This value is passed to onSelect
									onSelect={(currentValue) => {
										onValueChange(currentValue === value ? "" : currentValue); // Allows deselecting to empty string
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
