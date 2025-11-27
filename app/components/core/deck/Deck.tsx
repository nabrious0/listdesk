import { PlusIcon } from "@phosphor-icons/react";
import { motion, spring } from "motion/react";
import { DropdownMenu } from "radix-ui";
import Button from "~/components/core/form/Button";

interface DeckProps {
	newList: () => void;
}

const Deck = ({ newList }: DeckProps) => {
	return (
		<>
			<div className="fixed inset-x-0 bottom-0 z-[9999999999999999999999] flex items-center justify-center">
				<div
					className="rounded-t-[14px] border border-white/80 bg-white/20 px-4 py-3 backdrop-blur-sm backdrop-saturate-200"
					style={{ boxShadow: "0 0 0 2px rgb(0, 0, 0, 10%)" }}
				>
					<div className="-mt-8 flex gap-2">
						<Button color="azure" onClick={newList}>
							<div className="drop-shadow-azure-800/90 me-2 drop-shadow-xs">
								<PlusIcon weight="bold" />
							</div>
							<div>New Task List</div>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Deck;
