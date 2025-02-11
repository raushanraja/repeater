import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { MonacoEditor } from 'solid-monaco';
import { getFileByName } from '../Components/indexdb';
import { post } from '../api';

const Loader = () => {
    return <span class='loading loading-spinner loading-sm'></span>;
};

const Problems = () => {
    const [loading, setLoading] = createSignal(false);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    let code = '';
    const [language, setLanguage] = createSignal('rust');

    const onChange = (value: string, _event: unknown) => {
        code = value;
    };

    const onLanguageChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setLanguage(target.value);
    };

    //@ts-ignore
    const name = location.state?.name || params.item;

    const handleClick = async () => {
        setLoading(true);
        //@ts-ignore
        const name = location.state?.name;
        if (name) {
            const current_code = await getFileByName(name);
            if (current_code?.content) {
                const response = await post(current_code.content, code);
                navigate('/comparision', {
                    state: {
                        name: name,
                        current_code: current_code.content,
                        code: code,
                        language: language(),
                        response: response,
                    },
                });
            }
        }
    };

    return (
        <>
            <h1 class='mb-4'>Question: {name}</h1>
            <select
                class='select select-bordered w-30 mb-4'
                onChange={onLanguageChange}>
                <option value='rust'>Rust</option>
                <option value='c++'>C++</option>
                <option value='python'>Python</option>
            </select>
            <div class='h-96 bg-red-500'>
                <MonacoEditor
                    onChange={onChange}
                    language={language()}
                    class='bg-red-800'
                    options={{
                        theme: 'vs-dark',
                    }}
                />
            </div>
            <button
                class='btn btn-outline float-end mt-4 w-30'
                onclick={handleClick}>
                {loading() ? <Loader /> : 'Compare'}
            </button>
        </>
    );
};

export default Problems;
