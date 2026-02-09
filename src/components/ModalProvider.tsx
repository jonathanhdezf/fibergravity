"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ContractModal } from "./ui/ContractModal";
import { SupportTicketModal } from "./ui/SupportTicketModal";
import { TVPlayerModal } from "./ui/TVPlayerModal";

interface ModalContextType {
    openModal: (planName?: string) => void;
    openSupportModal: () => void;
    openPlayerModal: (channelName: string, channelUrl: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    // Multiple states for different context data
    const [planName, setPlanName] = useState<string | undefined>(undefined);
    const [playerData, setPlayerData] = useState<{ name: string, url: string } | undefined>(undefined);

    const openModal = (plan?: string) => {
        setPlanName(plan);
        setIsContractOpen(true);
    };

    const openSupportModal = () => {
        setIsSupportOpen(true);
    };

    const openPlayerModal = (name: string, url: string) => {
        setPlayerData({ name, url });
        setIsPlayerOpen(true);
    };

    const closeModal = () => {
        setIsContractOpen(false);
        setIsSupportOpen(false);
        setIsPlayerOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, openSupportModal, openPlayerModal, closeModal }}>
            {children}
            <ContractModal isOpen={isContractOpen} onClose={closeModal} planName={planName} />
            <SupportTicketModal isOpen={isSupportOpen} onClose={closeModal} />
            <TVPlayerModal
                isOpen={isPlayerOpen}
                onClose={closeModal}
                channelName={playerData?.name}
                channelUrl={playerData?.url}
            />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
