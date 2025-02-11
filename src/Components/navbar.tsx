const Navbar = () => {
    const onSettingsClick = () => {
        const modal = document.getElementById('my_modal_1');
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    };

    const onAddClick = () => {
        const modal = document.getElementById('my_modal_2');
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    };

    return (
        <div class='navbar bg-base-100 mb-4'>
            <div class='flex-1'>
                <a class='btn btn-ghost text-xl bg-base-300' href='/#'>
                    [object Object]
                </a>
            </div>
            <div class='flex-none'>
                <ul class='menu menu-horizontal px-1'>
                    <li>
                        <button class='btn' onclick={onAddClick}>
                            Add
                        </button>
                    </li>
                    <li>
                        <button class='btn' onclick={onSettingsClick}>
                            Setting
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
