import { ModalsBooking } from "../hooks/useModal";
type info = {
    time: string;
    event: number;
};

const ModalBooking = (typeInfo: info) => {
    const { time, event } = typeInfo;
    const { handleSubmit, users, showModal, setShowModal } = ModalsBooking(time, event);

    return (
        <>
            <button
                className="bg-blue-200 text-black active:bg-blue-500 
                            font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}>
                {time}
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                                <div className="w-full p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex flex-nowrap justify-between p-2 pb-6 border-b-2">
                                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">General Info</h5>
                                        <span className="text-white">X</span>
                                    </div>
                                    {users?.map((user, i) => (
                                        <form key={i} className="space-y-6 flex flex-wrap" onSubmit={handleSubmit}>
                                            <div className=""></div>
                                            <div className="w-1/2 m-0 mt-0 p-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Name
                                                </label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                    value={user.name}
                                                />
                                            </div>
                                            <div className="w-1/2 m-0 mt-0 p-2">
                                                <label
                                                    htmlFor="surname"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Surname
                                                </label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="surname"
                                                    id="surname"
                                                    placeholder="surname"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                    value={user.surname}
                                                />
                                            </div>
                                            <div className="w-1/2 m-0 mt-0 p-2">
                                                <label
                                                    htmlFor="age"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Age
                                                </label>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    name="age"
                                                    id="age"
                                                    placeholder="age"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                    min="18"
                                                    max="110"
                                                    value={user.age}
                                                />
                                            </div>
                                            <div className="w-1/2 m-0 mt-0 p-2">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Your email
                                                </label>
                                                <input
                                                    readOnly
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    placeholder="name@company.com"
                                                    required
                                                    value={user.mail}
                                                />
                                            </div>
                                            <div className="flex flex-nowrap w-full border-t-2 pt-4">
                                                <div className="p-2 flex flex-wrap w-full">
                                                    <button
                                                        type="submit"
                                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                                                dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Prenota
                                                    </button>
                                                </div>
                                                <div className="p-2 flex flex-wrap w-full">
                                                    <button
                                                        type="button"
                                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                                                dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        onClick={() => setShowModal(false)}>
                                                        Chiudi
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ModalBooking;
