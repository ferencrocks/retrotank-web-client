import type { OutgoingMessageSender, Direction } from "~/game/sync/types";
import { PlayerKeyboardInput } from "~/game/player-input";
import { useCallback } from "react";

interface PlayerInputSyncProps {
    sendMessage: OutgoingMessageSender
}


export const PlayerInputSync = ({ sendMessage }: PlayerInputSyncProps) => {
    const sendPlayerDirection =
        (direction: Direction, shouldMove: boolean = false) => sendMessage("player.direction", [direction, shouldMove]);

    const handleShortPressKey = useCallback((key: string) => {

    }, [sendMessage]);

    const handleLongPressKeyDown = useCallback((key: string) => {
        switch (key) {
            case "ArrowUp": sendPlayerDirection("up", true); break;
            case "ArrowDown": sendPlayerDirection("down", true); break;
            case "ArrowLeft": sendPlayerDirection("left", true); break;
            case "ArrowRight": sendPlayerDirection("right", true); break;
        }
    }, [sendMessage]);

    const handleLongPressKeyUp = useCallback((key: string) => {
        switch (key) {
            case "ArrowUp": sendPlayerDirection("up"); break;
            case "ArrowDown": sendPlayerDirection("down"); break;
            case "ArrowLeft": sendPlayerDirection("left"); break;
            case "ArrowRight": sendPlayerDirection("right"); break;
        }
    }, [sendMessage]);

    return <PlayerKeyboardInput
        longPressKeys={["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]}
        onShortPressKey={key => console.log(key)}
        onLongPressKeyDown={handleLongPressKeyDown}
        onLongPressKeyUp={handleLongPressKeyUp}
    />;
};