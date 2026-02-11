"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ContractModal } from "./ui/ContractModal";
import { SupportTicketModal } from "./ui/SupportTicketModal";
import { TVPlayerModal } from "./ui/TVPlayerModal";
import { TelmexGamerModal } from "./ui/TelmexGamerModal";
import { ProviderGamerModal } from "./ui/ProviderGamerModal";
import { CategoryModal, PlanCategory } from "./ui/CategoryModal";

import { RealTimeSpeedTestModal } from "./ui/RealTimeSpeedTestModal";

interface ModalContextType {
    openModal: (planName?: string) => void;
    openSupportModal: () => void;
    openPlayerModal: (channelName: string, channelUrl: string) => void;
    openGamerModal: () => void;
    openProviderGamerModal: (provider: "Totalplay" | "Megacable" | "Telcel" | "Impactel/Cablecom") => void;
    openCategoryModal: (category: PlanCategory, providerName: string) => void;
    openSpeedTestModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [isGamerOpen, setIsGamerOpen] = useState(false);
    const [isProviderGamerOpen, setIsProviderGamerOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<"Totalplay" | "Megacable" | "Telcel" | "Impactel/Cablecom" | undefined>(undefined);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<PlanCategory | undefined>(undefined);
    const [selectedProviderName, setSelectedProviderName] = useState<string | undefined>(undefined);

    // Multiple states for different context data
    const [planName, setPlanName] = useState<string | undefined>(undefined);
    const [playerData, setPlayerData] = useState<{ name: string, url: string } | undefined>(undefined);

    const isAnyModalOpen = isContractOpen || isSupportOpen || isPlayerOpen || isGamerOpen || isProviderGamerOpen || isCategoryOpen || isSpeedTestOpen;

    const openModal = (plan?: string) => {
        setPlanName(plan);
        setIsContractOpen(true);
        window.history.pushState({ modal: "contract" }, "");
    };

    const openSupportModal = () => {
        setIsSupportOpen(true);
        window.history.pushState({ modal: "support" }, "");
    };

    const openPlayerModal = (name: string, url: string) => {
        setPlayerData({ name, url });
        setIsPlayerOpen(true);
        window.history.pushState({ modal: "player" }, "");
    };

    const openGamerModal = () => {
        setIsGamerOpen(true);
        window.history.pushState({ modal: "gamer" }, "");
    };

    const openProviderGamerModal = (provider: "Totalplay" | "Megacable" | "Telcel" | "Impactel/Cablecom") => {
        setSelectedProvider(provider);
        setIsProviderGamerOpen(true);
        window.history.pushState({ modal: "provider-gamer" }, "");
    };

    const openCategoryModal = (category: PlanCategory, providerName: string) => {
        setSelectedCategory(category);
        setSelectedProviderName(providerName);
        setIsCategoryOpen(true);
        window.history.pushState({ modal: "category-modal" }, "");
    };

    const openSpeedTestModal = () => {
        setIsSpeedTestOpen(true);
        window.history.pushState({ modal: "speedtest" }, "");
    };

    const closeModal = () => {
        if (isAnyModalOpen) {
            if (window.history.state && window.history.state.modal) {
                window.history.back();
            }
        }
        setIsContractOpen(false);
        setIsSupportOpen(false);
        setIsPlayerOpen(false);
        setIsGamerOpen(false);
        setIsProviderGamerOpen(false);
        setIsCategoryOpen(false);
        setIsSpeedTestOpen(false);
    };

    // Handle browser back button (popstate)
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            // Close all modals when back button is pressed
            setIsContractOpen(false);
            setIsSupportOpen(false);
            setIsPlayerOpen(false);
            setIsGamerOpen(false);
            setIsProviderGamerOpen(false);
            setIsCategoryOpen(false);
            setIsSpeedTestOpen(false);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, openSupportModal, openPlayerModal, openGamerModal, openProviderGamerModal, openCategoryModal, openSpeedTestModal, closeModal }}>
            {children}
            <ContractModal isOpen={isContractOpen} onClose={closeModal} planName={planName} />
            <SupportTicketModal isOpen={isSupportOpen} onClose={closeModal} />
            <TVPlayerModal
                isOpen={isPlayerOpen}
                onClose={closeModal}
                channelName={playerData?.name}
                channelUrl={playerData?.url}
            />
            <TelmexGamerModal isOpen={isGamerOpen} onClose={closeModal} />
            {selectedProvider && (
                <ProviderGamerModal
                    isOpen={isProviderGamerOpen}
                    onClose={closeModal}
                    provider={selectedProvider}
                />
            )}
            {selectedCategory && selectedProviderName && (
                <CategoryModal
                    isOpen={isCategoryOpen}
                    onClose={closeModal}
                    category={selectedCategory}
                    providerName={selectedProviderName}
                />
            )}
            <RealTimeSpeedTestModal isOpen={isSpeedTestOpen} onClose={closeModal} />
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
