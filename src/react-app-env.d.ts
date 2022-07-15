/// <reference types="react-scripts" />

declare module '*.mp4';
// {
//     const src: string;
//     export default src;
// }

declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare module'*jpg' {
    const value: any;
    export = value;
}

export type PropsWithChildrenOnly = PropsWithChildren<unknown>;
export type ReactFCWithChildren = React.FC<PropsWithChildrenOnly>;
