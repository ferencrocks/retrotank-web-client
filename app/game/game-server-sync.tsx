import { useEffect, useState, useCallback } from "react";
import { getJSON, postJSON } from "~/lib/request";
import { PlayerInputSync } from "~/game/sync/player-input-sync";

import type { Player, OutgoingMessageSender } from "~/game/sync/types";

interface GameServerSyncProps {
    gameId: string,
    playerNickname: string
}


export const GameServerSync = ({ gameId, playerNickname }: GameServerSyncProps) => {
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [joinedGameId, setJoinedGameId] = useState<string | null>(null);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);


    const sendMessage = useCallback<OutgoingMessageSender>((action, args = []) => {
        websocket?.send(JSON.stringify([action, args]));
    }, [websocket]);

    const handleMessageReceived = useCallback((msg: any) => {
        console.log('MSGREC', msg);
    }, []);


    useEffect(() => {
        if (!playerId) {
            postJSON("http://localhost:8080/player/register", {nickname: playerNickname}).then((player: Player) => {
                setPlayerId(player.id);
            });
        }
    }, [playerId]);

    useEffect(() => {
        if (!playerId || gameId === joinedGameId) return;

        if (joinedGameId) {
            // TODO: leave game
            if (websocket) {
                websocket.close();
            }
        }

        postJSON("http://localhost:8080/player/joingame", {player_id: playerId, game_id: gameId})
            .then(() => {
                setJoinedGameId(gameId);
            })
            .then(() => {
                const ws = new WebSocket(`http://localhost:8080/player/${playerId}/ws`);
                ws.onopen = () => {
                    setWebsocket(ws);
                };

                ws.onmessage = (evt) => {
                    handleMessageReceived(evt.data);
                };
            });
    }, [playerId, gameId, joinedGameId]);


    return <>
        { websocket ? <PlayerInputSync sendMessage={sendMessage} /> : null }
    </>
};