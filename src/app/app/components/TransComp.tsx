import React, { useEffect, useRef } from "react";

const TransComp = () => {
    const statusRef = useRef<HTMLDivElement>(null);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const audioCtx = useRef<AudioContext | null>(null);

    const startRecording = () => {
        if (!audioCtx.current) return;

        if (audioCtx.current.state === "suspended") {
            audioCtx.current.resume();
        }

        let mediaRecorder: MediaRecorder;

        const dest = audioCtx.current.createMediaStreamDestination();

        Promise.all([
            navigator.mediaDevices.getUserMedia({ audio: true }),
            navigator.mediaDevices.getDisplayMedia({
                audio: true,
            }),
        ])
            .then(([micStream, displayStream]) => {
                if (!MediaRecorder.isTypeSupported("audio/webm")) {
                    alert("Browser not supported");
                    return;
                }

                [micStream, displayStream].forEach((str) => {
                    if (audioCtx.current) {
                        const src = audioCtx.current.createMediaStreamSource(str);
                        src.connect(dest);
                    }
                });

                mediaRecorder = new MediaRecorder(dest.stream, {
                    mimeType: "audio/webm",
                });

                if (!socketRef.current) {
                    socketRef.current = new WebSocket("ws://localhost:5555/listen");
                }

                socketRef.current.onopen = () => {
                    if (statusRef.current) statusRef.current.textContent = "Connected";
                    mediaRecorder.addEventListener("dataavailable", (event) => {
                        if(!socketRef.current) return;

                        if (event.data.size > 0 && socketRef.current.readyState === 1) {
                            socketRef.current.send(event.data);
                        }
                    });
                    mediaRecorder.start(250); //sending blobs of data every 250ms
                };

                socketRef.current.onmessage = (message) => {
                    const received = message.data;
                    console.log(received);
                    if (received && transcriptRef.current) {
                        transcriptRef.current.textContent += " " + received;
                    }
                };
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        audioCtx.current = new AudioContext();
    }, []);

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <div>
            <button onClick={startRecording}>Start</button>
            <div id="status" ref={statusRef} />
            <div id="transcript" ref={transcriptRef} />
        </div>
    );
};

export default TransComp;