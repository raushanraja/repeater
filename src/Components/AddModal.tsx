import { createSignal, onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getAllFileNames, saveFile } from './indexdb';

const Loader = () => {
    return <span class='loading loading-spinner loading-sm'></span>;
};

const AddModal = () => {
    const [loading, setLoading] = createSignal(false);
    const [files, setFiles] = createStore<string[]>([]);
    const [newFileName, setNewFileName] = createSignal('');
    const [fileData, setFileData] = createSignal('');

    const loadFiles = async () => {
        const storedFiles = await getAllFileNames();
        if (storedFiles) setFiles(storedFiles);
    };

    const addFile = () => {
        const fileName = newFileName();
        if (fileName) {
            saveFile(fileName, fileData());
            setNewFileName('');
            loadFiles();
        }
    };

    const onFileUpload = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const content = reader.result as string;
                setFileData(content);
            };
            reader.readAsText(file);
        }
    };

    onMount(() => {
        loadFiles();
    });

    return (
        <dialog id='my_modal_2' class='modal'>
            <div class='modal-box'>
                <div class='p-4'>
                    <h2 class='text-xl font-bold mb-4'>Files</h2>
                    <ul class='list-disc pl-5 mb-4'>
                        {loading() ? (
                            <Loader />
                        ) : files.length === 0 ? (
                            <>
                                <li>No files found</li>
                            </>
                        ) : (
                            files.map((file) => <li>{file}</li>)
                        )}
                    </ul>
                    <h2 class='text-xl font-bold mb-4'>Add File</h2>
                    <div class='flex flex-col items-center gap-4'>
                        <input
                            type='text'
                            class='input input-bordered w-full'
                            placeholder='title'
                            required
                            onInput={(e) =>
                                setNewFileName(e.currentTarget.value)
                            }
                            value={newFileName()}
                        />
                        <input
                            type='file'
                            class='file-input file-input-bordered w-full '
                            accept='.cpp,.rs,.py,.js'
                            onChange={onFileUpload}
                        />
                    </div>
                </div>
                <div class='modal-action'>
                    <button class='btn btn-success' onClick={addFile}>
                        Add
                    </button>
                    <form method='dialog'>
                        <button class='btn btn-neutral'>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddModal;

