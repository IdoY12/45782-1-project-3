import { useContext, useEffect, type PropsWithChildren } from "react";
import { socket } from "./io";
import { useAppDispatcher } from "../../redux/hooks";
import { incrementLikes, decrementLikes } from "../../redux/vacations-slice";
import SocketMessages from "./socket-enums/socket-enums";
import AuthContext from "../auth/auth/AuthContext";

export default function SocketDispatcher(props: PropsWithChildren) {
    const { children } = props
    const dispatch = useAppDispatcher();

    function decodeJwt(token: string) {
        const [, payload] = token.split(".");
        return JSON.parse(atob(payload));
    }

    const auth = useContext(AuthContext);
    const jwt = auth?.jwt;

    const decoded = jwt ? decodeJwt(jwt) : null
    const currentUserId = decoded?.id


    useEffect(() => {
        socket.on(SocketMessages.LikesUpdated, ({ vacationId, change, userId }) => {
            if(userId === currentUserId) return;

            if (change === 1) dispatch(incrementLikes(vacationId));
            if (change === -1) dispatch(decrementLikes(vacationId));
        });

        return () => {
            socket.off(SocketMessages.LikesUpdated);
        };
    }, [currentUserId, dispatch]);

    return children;
}
