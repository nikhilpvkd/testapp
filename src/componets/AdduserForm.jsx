import React, { useState } from "react";
import styled from "styled-components";
import { useAddUserMutation, useUpdateUserMutation } from "../features/api/apiSlice";
import { useSelector } from "react-redux";

const AdduserForm = ({ user, setUser, isEdit, edituserId, setEditUserId, setEdit }) => {
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const { userNames } = useSelector((state) => state.users);

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitt", user);
        if (
            user.firstName &&
            user.lastName &&
            !userNames.includes(user.firstName + user.lastName)
        ) {
            if (!isEdit) {
                addUser(user)
                    .unwrap()
                    .then((res) => {
                        if (res) {
                            setUser({
                                firstName: "",
                                lastName: "",
                            });
                        }
                    })
                    .catch(() => {
                        window.alert("something went wrong");
                    });
            } else {
                if (edituserId) {
                    try {
                        updateUser({ id: edituserId, body: user }).unwrap();
                        setUser({
                            firstName: "",
                            lastName: "",
                        });
                        setEdit(false), setEditUserId("");
                    } catch (err) {
                        window.alert("something went wrong");
                    }
                }
            }
        } else {
            window.alert("please add all fields/check the feilds");
        }
    };
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={user.firstName}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    value={user.lastName}
                />
                <button type="submit">{!isEdit ? "Add +" : "edit"}</button>
            </form>
        </Wrapper>
    );
};

export default AdduserForm;

const Wrapper = styled.div`
    padding: 20px 0;
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 500px;
        padding: 20px;
        input {
            width: 60%;
            height: 25px;
            font-size: 18px;
            padding: 5px;
        }
    }
`;
