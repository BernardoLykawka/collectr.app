"use client";

import { useRouter } from "next/navigation";
import { CreateCollectionForm } from "./newCollectionForm";
import type { Collection } from "@/lib/collection-service";

interface NewCollectionModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function NewCollectionModal({ isOpen, onClose }: NewCollectionModalProps) {
	const router = useRouter();

	if (!isOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSuccess = (collection: Collection) => {
		onClose();
		if (collection?.id != null) {
			router.push(`/collection/${collection.id}`);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 px-8 py-4 md:px-16"
			onClick={handleBackdropClick}
		>
			<div className="w-full max-w-md">
				<CreateCollectionForm onSuccess={handleSuccess} />
			</div>
		</div>
	);
}


