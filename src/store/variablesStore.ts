import axios from "axios";
import { create } from "zustand";
import { useCurrents } from "./currents";
import { z } from "zod";
import { UserVariablesValidSchema } from "@/shared/gschemas";

export type UserVariables = z.infer<typeof UserVariablesValidSchema>;

export interface VariablesStore {
    variables?: UserVariables;
    setVariables: (variables: UserVariables) => void;
    getVariables: () => Promise<UserVariables>;
    getVariablesSync: () => UserVariables;
    clearVariables: () => void;
}

export const DefaultUserVariables: UserVariables = {
    channelFontSize: 16,
    appFontSize: 36,
    defaultZoomFactor: 2,
    magnifyingGlassOnPreviews: true,
}

const tryFetchUserVariables = async (tries: number): Promise<UserVariables> => {
    const resp = await axios.get(`api/v1/user/variables`);
    if (resp.status === 200) {
        return resp.data.data as UserVariables;
    } else {
        await new Promise(resolve => setTimeout(resolve, 250));
        return tryFetchUserVariables(tries + 1);
    }
}

export const useVariablesStore = create<VariablesStore>((set, get) => ({
    variables: undefined,
    setVariables: (variables) => {
        set({variables});
    },
    getVariables: async () => {
        const state = get();
        if (state.variables) {
            return state.variables;
        } else {
            return await tryFetchUserVariables(0);
        }
    },
    getVariablesSync: () => {
        const state = get();
        if (state.variables) {
            return state.variables;
        } else {
            tryFetchUserVariables(0).then((gotVariables) => {
                set({ variables: gotVariables });
            });

            return DefaultUserVariables;
        }
    },
    clearVariables: () => {
        set({variables: undefined});
    }
}));

export const useVariables = () => {
    const currents = useCurrents();
    const variablesStore = useVariablesStore();

    return currents.user?.variables ? (typeof currents.user.variables === 'string' ? JSON.parse(currents.user.variables) : []) as UserVariables : variablesStore.getVariablesSync();
}