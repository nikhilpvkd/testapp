import { useEffect, useState } from "react";
import AdduserForm from "./componets/AdduserForm";
import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation,
} from "./features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUserNames } from "./features/userSlice";

function App() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
    });

    const dispatch = useDispatch();

    const [isEdit, setEdit] = useState(false);
    const [edituserId, setEditUserId] = useState("");

    const { data, isLoading } = useGetAllUsersQuery();
    useEffect(() => {
        if (!isLoading) {
            console.log(data);
            dispatch(setUserNames(data));
        }
    }, [data]);

    const [deleteUser] = useDeleteUserMutation();

    const handleUpdate = (id, firstName, lastName) => {
        console.log(id, firstName, lastName);
        setUser({
            firstName,
            lastName,
        });
        setEdit(true);
        setEditUserId(id);
    };

    const handleDelete = (id) => {
        deleteUser(id);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <AdduserForm
                user={user}
                setUser={setUser}
                isEdit={isEdit}
                setEdit={setEdit}
                edituserId={edituserId}
                setEditUserId={setEditUserId}
            />
            <table>
                <tr>
                    <th>first Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
                <tbody>
                    {data?.map(({ id, firstName, lastName }) => (
                        <tr key={id}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>
                                <button
                                    onClick={() => handleUpdate(id, firstName, lastName)}
                                >
                                    Edit
                                </button>
                                <button
                                    disabled={
                                        id === "_0A3C3898C46C1465037FE3A094CCDF95" ||
                                        id === "_0BCDFDFSD23231111E3A09D232DDDC33" ||
                                        id === "_01450B094CCDF95CSD21E3A09DDD2321"
                                    }
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
