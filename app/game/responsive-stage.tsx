import { Stage } from "@pixi/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";


export function ResponsiveStage({ children }: {children?: ReactNode}) {
    const [canvasWidth, setCanvasWidth] = useState(1024);
    const [canvasHeight, setCanvasHeight] = useState(768);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setCanvasWidth(window.innerWidth / window.devicePixelRatio);
            setCanvasHeight(window.innerHeight / window.devicePixelRatio);
        });

        document.querySelector('canvas')!.style.width = "";
        document.querySelector('canvas')!.style.height = "";
    });

    return <Stage
        width={canvasWidth}
        height={canvasHeight}
        options={{ background: 0x1099bb }}>

        {children}
    </Stage>
}