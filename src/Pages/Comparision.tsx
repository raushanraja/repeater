import { useLocation } from '@solidjs/router';
import { batch, createSignal, onMount } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';
import { MonacoDiffEditor } from 'solid-monaco';

const Comparision = () => {
    const [name, setName] = createSignal('');
    const [modified, setModified] = createSignal<string>('');
    const [original, setOriginal] = createSignal<string>('');
    const [language, setLanguage] = createSignal<string>('rust');
    const [response, setResponse] = createSignal<string>('');

    onMount(async () => {
        const location = useLocation();
        //@ts-ignore
        const name = location.state?.name;
        //@ts-ignore
        const current_code = location.state?.current_code;
        //@ts-ignore
        const code = location.state?.code;
        //@ts-ignore
        const language = location.state?.language;
        //@ts-ignore
        const response = location.state?.response;

        if (name && current_code && code) {
            batch(() => {
                setName(name);
                setOriginal(current_code);
                setModified(code);
                setLanguage(language);
                setResponse(response);
            });
        }
    });

    return (
        <>
            <h1 class='mb-4'>Comparision: {name()}</h1>
            <div class='h-96 bg-red-500'>
                <MonacoDiffEditor
                    originalLanguage={language()}
                    modifiedLanguage={language()}
                    original={original()}
                    modified={modified()}
                    options={{
                        theme: 'vs-dark',
                    }}
                />
            </div>
            <div
                class='text-md text-justify responseai'
                innerHTML={response()}></div>
        </>
    );
};

export { Comparision };
