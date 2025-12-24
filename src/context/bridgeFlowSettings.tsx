// Allows access to the modal state with useContext
import { Dispatch, SetStateAction, createContext } from "react";

/**
 * Bridge Settings
 */
interface BridgeSettings {
    preApplicationFormId?: string;
  }
  interface IBridgeSettingsContext {
    bridgeFlowSettings: BridgeSettings;
    setBridgeFlowSettings: Dispatch<SetStateAction<BridgeSettings>>;
  }
  export const bridgeFlowSettingsDefaultValue: IBridgeSettingsContext = {
    bridgeFlowSettings: {},
    setBridgeFlowSettings: () => false
  }
  export const bridgeFlowSettingsContext = createContext<IBridgeSettingsContext>(bridgeFlowSettingsDefaultValue);