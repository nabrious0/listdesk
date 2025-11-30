import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import {
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion, spring } from "motion/react";
import { DropdownMenu } from "radix-ui";
import { useEffect, useState } from "react";
import ZoomControls from "~/components/core/deck/ZoomControls";
import Button from "~/components/core/form/Button";

interface DeckProps {
	newList: () => void;
}

const Deck = ({ newList }: DeckProps) => {
	useEffect(() => {}, []);
	return (
		<>
			<div className="fixed inset-x-0 bottom-0 z-999999999999 flex items-center justify-center">
				<div
					className="relative rounded-t-[14px] px-4 py-3"
					style={{
						boxShadow:
							"0 0 0 2px color-mix(in srgb, var(--color-slate-950), transparent 85%)",
					}}
				>
					{/* inner white border */}
					<div className="absolute inset-0 z-1 rounded-t-[14px] border-2 border-b-0 border-white/60" />
					{/* handle backdrop-blur (neccessary to be done like this because how browsers handle it) */}
					<div className="absolute -inset-0.5 -z-1 overflow-hidden rounded-t-2xl shadow-sm shadow-slate-950/8">
						<div className="absolute inset-x-0 top-0 bottom-0 bg-white/50 backdrop-blur-sm backdrop-saturate-300" />
					</div>
					<div className="relative z-2 -mt-8 flex gap-2">
						<Button color="azure" onClick={newList}>
							<div className="drop-shadow-azure-800/90 me-2 drop-shadow-xs">
								<PlusIcon weight="bold" />
							</div>
							<div>New Task List</div>
						</Button>
						<ZoomControls />
					</div>
				</div>
			</div>
		</>
	);
};

export default Deck;
