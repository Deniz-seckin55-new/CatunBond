import { useCallback } from "react";

export const useDownload = () =>
    useCallback((fileUrl: string, filename?: string) => {
        fetch(fileUrl)
            .then((res) => res.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename ?? 'download';
                a.style.display = 'none'; // stealthy kitty mode 🐈‍⬛
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
    }, []);