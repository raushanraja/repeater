import type { Component, ParentComponent } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import { useNavigate, Router, Route, useParams } from '@solidjs/router';
import Navbar from './Components/navbar';
import AddModal from './Components/AddModal';
import { getAllFileNames } from './Components/indexdb';

const TabGrid: Component = () => {
    const [titles, setTitles] = createSignal<string[]>([]);
    const loadFiles = async () => {
        const storedFiles = await getAllFileNames();
        if (storedFiles) setTitles(storedFiles);
    };
    const navigate = useNavigate();

    onMount(() => {
        loadFiles();
    });

    return (
        <div class='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <button
                class='p-6 btn btn-outline'
                onClick={() => {
                    const random = Math.floor(Math.random() * titles().length);
                    const name = titles()[random];
                    navigate(
                        `/practice/${name.toLowerCase().replaceAll(' ', '')}`,
                        {
                            state: { name: name },
                        }
                    );
                }}>
                Pick a random problem
            </button>
            {titles().map((name) => (
                <button
                    class='p-6 btn btn-outline'
                    onClick={() =>
                        navigate(
                            `/practice/${name.toLowerCase().replaceAll(' ', '')}`,
                            {
                                state: { name: name },
                            }
                        )
                    }>
                    {name}
                </button>
            ))}
        </div>
    );
};

const Loader = () => {
    return <span class='loading loading-spinner loading-sm'></span>;
};

const SettingsModal: Component = () => {
    const [apiKey, setApiKey] = createSignal(
        localStorage.getItem('aistudioapikey') || ''
    );
    const [loading, setLoading] = createSignal(false);
    const [saved, setSaved] = createSignal(false);

    const saveApiKey = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        localStorage.setItem('aistudioapikey', apiKey());
        setLoading(false);
        setSaved(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const modal = document.getElementById('my_modal_1');
        const input = document.getElementById(
            'apikey_input'
        ) as HTMLInputElement;
        if (input) {
            input.value = '';
        }
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
        setSaved(false);
    };

    return (
        <dialog id='my_modal_1' class='modal'>
            <div class='modal-box'>
                <h3 class='text-lg font-bold mb-4'>
                    Add API Key {apiKey() ? `(${apiKey().length} chars)` : ''}
                </h3>
                <input
                    autocomplete='off'
                    type='password'
                    id='apikey_input'
                    onInput={(e) => setApiKey(e.currentTarget.value)}
                    placeholder='key'
                    class='input input-bordered w-full h-12'
                />
                <div class='modal-action'>
                    <button
                        type='submit'
                        class='btn btn-success'
                        onClick={saveApiKey}>
                        {loading() ? <Loader /> : saved() ? '✔ Saved' : 'Save'}
                    </button>
                    <form method='dialog'>
                        <button class='btn btn-neutral'>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

const App: ParentComponent = (props) => {
    return (
        <div class='w-full h-screen p-4'>
            <SettingsModal />
            <AddModal />
            <Navbar />
            {props.children}
        </div>
    );
};

export default App;
export { TabGrid };
