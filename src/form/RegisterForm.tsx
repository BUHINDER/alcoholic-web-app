import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {ImSpinner9} from "react-icons/im";
import {useRegisterMutation} from "../store/api/AuthApi";
import {UserEntity} from "../entity/UserEntity";

const RegisterForm = () => {
    const [user, setUser] = useState<UserEntity>({
        firstname: "",
        lastName: "",
        age: undefined,
        login: "",
        password: "",
    });
    const [register, {isLoading}] = useRegisterMutation();

    function handleFirstnameOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, firstname: e.target.value});
    }

    function handleLastNameOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, lastName: e.target.value});
    }

    function handleAgeOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, age: Number(e.target.value)});
    }

    function handleLoginOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, login: e.target.value});
    }

    function handlePasswordOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, password: e.target.value});
    }

    function handleOnClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        return register(user);
    }

    return (
        <>
            {
                isLoading
                    ? <ImSpinner9 className={""}/>
                    : <form className={""}>
                        <input className={""}
                               type={"text"}
                               placeholder={"Имя"}
                               required={true}
                               onChange={handleFirstnameOnChange}
                               value={user.firstname}
                               autoFocus={true}/>
                        <input className={""}
                               type={"text"}
                               placeholder={"Фамилия"}
                               required={true}
                               onChange={handleLastNameOnChange}
                               value={user.lastName}/>
                        <input className={""}
                               type={"number"}
                               placeholder={"Возраст"}
                               onChange={handleAgeOnChange}
                               value={user.age}
                               min={1}
                               max={150}/>
                        <input className={""}
                               type={"text"}
                               placeholder={"Имя пользователя"}
                               required={true}
                               onChange={handleLoginOnChange}
                               value={user.login}/>
                        <input className={""}
                               type={"password"}
                               placeholder={"Пароль"}
                               required={true}
                               onChange={handlePasswordOnChange}
                               value={user.password}/>
                        <button className={""}
                                onClick={handleOnClick}>
                            Зарегистрироваться
                        </button>
                    </form>
            }
        </>
    );
};

export default RegisterForm;
