import type { MetaFunction } from "@remix-run/node";
import {useMemo} from 'react';
import {AiChat} from '@nlux/react';
import '@nlux/themes/nova.css';
import {streamAdapter} from '../components/adapter';
import {personas} from '../components/personas';
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const adapter = useMemo(() => streamAdapter, []);
    return (
        <AiChat
            adapter={adapter}
            personaOptions={personas}
            displayOptions={{colorScheme: 'dark'}}
        />
    );
}
