import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { AnimatePresence, motion, type Target } from "motion/react";
import { CaretRightIcon } from "@phosphor-icons/react";

interface DropdownMenuContentProps {
	children: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "end" | "center" | "start";
	alignOffset?: number;
	sideOffset?: number;
	initial?: Target;
	animate?: Target;
	exit?: Target;
}

interface DropdownMenuRootProps {
	children: React.ReactNode;
	trigger: React.ReactNode;
	exposeOpen?: (isOpen: boolean) => void;
}

interface DropdownMenuItemProps {
	children: React.ReactNode;
	onClick?: () => void;
}

interface DropdownMenuSubProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "end" | "center" | "start";
	alignOffset?: number;
	sideOffset?: number;
	initial?: Target;
	animate?: Target;
	exit?: Target;
}

export const DropdownMenuRoot = React.forwardRef<
	HTMLButtonElement,
	DropdownMenuRootProps
>(function DropdownMenuRoot({ children, trigger, exposeOpen }, forwardedRef) {
	const [isOpen, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (exposeOpen) {
			exposeOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<>
			<DropdownMenuPrimitive.Root
				open={isOpen}
				onOpenChange={setOpen}
				modal={false}
			>
				<DropdownMenuPrimitive.Trigger
					className="group/dropdown block w-full"
					ref={forwardedRef}
				>
					{trigger}
				</DropdownMenuPrimitive.Trigger>
				<AnimatePresence>{isOpen && <>{children}</>}</AnimatePresence>
			</DropdownMenuPrimitive.Root>
		</>
	);
});

export const DropdownMenuContent = React.forwardRef<
	HTMLDivElement,
	DropdownMenuContentProps
>(function DropdownMenuContent(
	{ children, side, initial, animate, exit, align, alignOffset, sideOffset },
	forwardedRef,
) {
	return (
		<DropdownMenuPrimitive.Portal forceMount>
			<DropdownMenuPrimitive.Content
				className="rounded-lg bg-white p-2"
				style={{
					boxShadow:
						"0 0 0 1.5px color-mix(in srgb, var(--color-slate-500), transparent 88%), 0 3px 4px 0 color-mix(in srgb, var(--color-slate-900), transparent 88%)",
				}}
				side={side}
				sideOffset={sideOffset}
				ref={forwardedRef}
				align={align}
				alignOffset={alignOffset}
				asChild
			>
				<motion.div initial={initial} animate={animate} exit={exit}>
					{children}
				</motion.div>
			</DropdownMenuPrimitive.Content>
		</DropdownMenuPrimitive.Portal>
	);
});

export const DropdownMenuItem = React.forwardRef<
	HTMLDivElement,
	DropdownMenuItemProps
>(function DropdownMenuItem({ children, onClick }) {
	return (
		<>
			<DropdownMenuPrimitive.Item
				onClick={onClick}
				className="cursor-pointer rounded-md p-1.5 px-3 transition-all ease-linear hover:bg-slate-100 active:bg-slate-200"
			>
				{children}
			</DropdownMenuPrimitive.Item>
		</>
	);
});

export const DropdownMenuSubTrigger = React.forwardRef<
	HTMLDivElement,
	DropdownMenuItemProps
>(function DropdownMenuSubTrigger({ children }) {
	return (
		<>
			<div className="cursor-pointer rounded-md p-1.5 px-3 text-start transition-all ease-linear group-data-[state='open']/dropdown:bg-slate-100 hover:bg-slate-100 active:bg-slate-200">
				<div className="flex items-center">
					<div>{children}</div>
					<div className="ms-auto text-slate-500">
						<CaretRightIcon weight="bold" />
					</div>
				</div>
			</div>
		</>
	);
});
