import {ChatAdapter, StreamingAdapterObserver} from '@nlux/react';

// A demo endpoint by NLUX that connects to OpenAI
// and returns a stream of Server-Sent events
const demoProxyServerUrl = "https://demo.api.nlux.ai/openai/chat/stream";

export const streamAdapter: ChatAdapter = {
    streamText: async (
        prompt: string,
        observer: StreamingAdapterObserver,
    ) => {
        const canCreate = await window.ai.canCreateTextSession();
        // canCreate will be one of the following:
        // * "readily": the model is available on-device and so creating will happen quickly
        // * "after-download": the model is not available on-device, but the device is capable,
        //   so creating the session will start the download process (which can take a while).
        // * "no": the model is not available for this device.

        if (canCreate !== "no") {
            const session = await window.ai.createTextSession();

            // Prompt the model and stream the result:
            const stream = session.promptStreaming(prompt);
            for await (const chunk of stream) {
                observer.next(chunk);
            }
        }

        observer.complete();
    },
};