import { useUserStore } from "@/store/users";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { User } from "../../utils/socket_utils";
import { useCurrents } from "@/store/currents";

const UsersHandler: React.FC = () => {
    const currents = useCurrents();
    const userStore = useUserStore();

    useEffect(() => {
        if (!currents.user) return;
        if (userStore.getExistingUser(currents.user.id)) return;

        userStore.addUser({ id: currents.user.id, username: currents.user.username, avatarUrl: currents.user.avatarUrl });
    }, [currents.user]);

    useEffect(() => {
        if (!currents.server) return;

        userStore.addUsers(currents.server.members);
    }, [currents.server]);

    useEffect(() => {
        if (!currents.directmessage) return;

        userStore.addUsers(currents.directmessage.directMsgFor);
    }, [currents.directmessage]);

    return (<></>);
}

export default UsersHandler;