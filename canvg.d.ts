export interface Options {
    log?: boolean;
    useCORS?: boolean;
    ignoreMouse?: boolean;
    ignoreDimensions?: boolean;
    ignoreClear?: boolean;
    ignoreAnimation?: boolean;
    enableRedraw?: boolean;

    offsetX?: number;
    offsetY?: number;
    scaleWidth?: number;
    scaleHeight?: number;

    renderCallback?: (dom: Document) => void;
    forceRedraw?: () => boolean;
}

declare function canvg(target?: string | HTMLCanvasElement, s?: string | Document, opts?: Options): void;

export default canvg;
