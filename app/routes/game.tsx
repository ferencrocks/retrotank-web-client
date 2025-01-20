import type { Route } from "./+types/home";
import { ResponsiveStage } from "~/game/responsive-stage";
import { GameServerSync } from "~/game/game-server-sync";

import { Sprite } from "@pixi/react";
import { useEffect, useState } from "react";
import { getJSON } from "~/lib/request";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Retrotank game room" },
        { name: "description", content: "Retrotank game room" },
    ];
}

export default function Game() {
    const [currentGameId, setCurrentGameId] = useState<string | null>(null);

    // TODO: temporary
    useEffect(() => {
        if (!currentGameId) {
            getJSON("http://localhost:8080/games/all").then((games) => {
                setCurrentGameId(games[0].id);
            });
        }
    }, [currentGameId]);

    return <>
        {currentGameId
            ? <GameServerSync gameId={currentGameId} playerNickname="gazsko" />
            : null
        }

        <ResponsiveStage>
            <Sprite x={1} y={1} image="/sprites/tank.png" scale={0.2} />
        </ResponsiveStage>
    </>
}
