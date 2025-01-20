// import type { ReactNode } from "react";
import { useEffect, useCallback, useState } from "react";

interface PlayerKeyboardInputProps {
    longPressKeys?: string[];
    onLongPressKeyDown?: (key: string) => void;
    onLongPressKeyUp?: (key: string) => void;
    onShortPressKey?: (key: string) => void;
}

export const PlayerKeyboardInput = ({
        longPressKeys = [],
        onLongPressKeyDown = () => {},
        onLongPressKeyUp = () => {},
        onShortPressKey = () => {},
    }: PlayerKeyboardInputProps) => {
    const [pressedLongKeys, setPressedKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { code } = event;

            setPressedKeys((prevKeys) => {
                if (!prevKeys.has(code)) {
                    if (longPressKeys.includes(code)) {
                        onLongPressKeyDown(code);
                    } else {
                        onShortPressKey(code);
                    }
                }

                return new Set(prevKeys).add(code);
            });
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const { code } = event;

            setPressedKeys((prevKeys) => {
                const newKeys = new Set(prevKeys);
                if (newKeys.has(code)) {
                    newKeys.delete(code);
                    if (longPressKeys.includes(code)) {
                        onLongPressKeyUp(code);
                    }
                }

                return newKeys;
            });
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [longPressKeys, onLongPressKeyDown, onLongPressKeyUp, onShortPressKey]);


    return null;
};
