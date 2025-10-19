import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import { useImagePreviewStore } from "@/store/imagepreviewstore";
import { DefaultUserVariables } from "@/store/variablesStore";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const ImagePreview: React.FC<{}> = () => {
    const currents = useCurrents();
    if (currents.userVariables?.magnifyingGlassOnPreviews ?? DefaultUserVariables.magnifyingGlassOnPreviews) {
        return <MagnifyingImagePreview />;
    } else {
        return <MovingImagePreview />;
    }
}

const MovingImagePreview: React.FC = ({ }) => {
    const { shown, fileUrl, zoomFactor, setZoomFactor, pos, setPos, ...imagePreviewStore } = useImagePreviewStore();
    const { userVariables } = useCurrents();
    const FullImageRef = useRef<HTMLImageElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const closeFullImage = () => {
        imagePreviewStore.setShown(false);
    }

    useEffect(() => {
        setZoomFactor(1);
        setPos({x: 0, y: 0});
    }, [shown]);

    const onClickImageOuter = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (((ev.target) as HTMLElement).classList.contains(styles.image_preview_full)) { } else
            imagePreviewStore.setShown(false);
    }

    const defaultMult = useMemo(() => zoomFactor, [zoomFactor]);

    const onMouseMove = useCallback((ev: React.MouseEvent) => {
        if (FullImageRef.current && isDragging) {
            setPos(s => ({x: s.x+ev.movementX/defaultMult, y: s.y+ev.movementY/defaultMult}));
        }
    }, [zoomFactor, isDragging]);

    useEffect(() => {
        console.log("Drag: ",isDragging);
    }, [isDragging]);

    const onMouseDown = useCallback((ev: React.MouseEvent) => {
        ev.preventDefault();
        setIsDragging(true);
    }, [zoomFactor]);

    const onMouseUp = useCallback((ev: React.MouseEvent) => {
        ev.preventDefault();
        setIsDragging(false);
    }, [zoomFactor]);

    const onDoubleClick = useCallback((ev: React.MouseEvent) => {
        if(zoomFactor === 1)
            setZoomFactor(userVariables?.defaultZoomFactor ?? DefaultUserVariables.defaultZoomFactor);
        else
            setZoomFactor(1);
    }, [zoomFactor]);

    const onWheel = useCallback((ev: React.WheelEvent) => {
        setZoomFactor(s => (s-(ev.deltaY/1000)*(s > 0.2 ? s : 1)).clamp(-2,8));
    }, [zoomFactor]);

    if (!fileUrl || fileUrl.trim() === "") return <></>;

    return (
        <div onDoubleClick={onDoubleClick} onWheel={onWheel} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? "auto" : "none", zIndex: 20 }} className={styles.image_preview_full_holder} onClick={onClickImageOuter}>
            <img ref={FullImageRef} style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? "auto" : "none", cursor: isDragging ? "grabbing" : "grab", transform: `scale(${zoomFactor}) translate(${pos.x}px, ${pos.y}px)`}} className={styles.image_preview_full} src={fileUrl} />
        </div>
    );
}
const MagnifyingImagePreview: React.FC = ({ }) => {
    const { shown, fileUrl, ...imagePreviewStore } = useImagePreviewStore();
    const [zoomFactor, setZoomFactor] = useState<number>(1);
    const [pos, setPos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const { userVariables } = useCurrents();
    const FullImageRef = useRef<HTMLImageElement>(null);

    const closeFullImage = () => {
        imagePreviewStore.setShown(false);
    }

    useEffect(() => {
        setZoomFactor(1);
    }, [shown]);

    const onClickImage = (ev: React.MouseEvent) => {
        // Zoom...
        const img = ev.target as HTMLImageElement;

        if (zoomFactor === 1) {
            setZoomFactor(userVariables?.defaultZoomFactor || DefaultUserVariables.defaultZoomFactor);
            requestAnimationFrame(() => { });
        } else {
            setZoomFactor(1);
        }
    }

    const onClickImageOuter = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (((ev.target) as HTMLElement).classList.contains(styles.image_preview_full)) { onClickImage(ev); } else
            imagePreviewStore.setShown(false);
    }

    const onMouseMove = useCallback((ev: React.MouseEvent) => {
        setPos({x: ev.clientX, y: ev.clientY})
    }, [zoomFactor]);

    if (!fileUrl || fileUrl.trim() === "") return <></>;

    return (
        <div onMouseMove={onMouseMove} style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? "auto" : "none", zIndex: 20 }} className={styles.image_preview_full_holder} onClick={onClickImageOuter}>
            <img ref={FullImageRef} style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? "auto" : "none", transform: `scale(${zoomFactor}) translate(${-(pos.x - window.outerWidth / 2)}px, ${-(pos.y - window.outerHeight / 3)}px)` }} className={styles.image_preview_full} src={fileUrl} onClick={onClickImage} />
        </div>
    );
}