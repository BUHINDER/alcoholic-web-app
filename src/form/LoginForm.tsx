import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {ImSpinner9} from "react-icons/im";
import {useLoginMutation} from "../store/api/AuthApi";
import {UserCredentialsEntity} from "../entity/UserCredentialsEntity";

const LoginForm = () => {
    const [user, setUser] = useState<UserCredentialsEntity>({login: "", password: ""});
    const [login, {isLoading}] = useLoginMutation();

    function handleLoginOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, login: e.target.value});
    }

    function handlePasswordOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, password: e.target.value});
    }

    function handleOnClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        return login(user);
    }

    return (
        <>
            {
                isLoading
                    ? <ImSpinner9 className={""}/>
                    : <form className={""}>
                        <input className={""}
                               type={"text"}
                               placeholder={"Имя пользователя"}
                               onChange={handleLoginOnChange}
                               value={user.login}
                               autoFocus={true}/>
                        <input className={""}
                               type={"password"}
                               placeholder={"Пароль"}
                               onChange={handlePasswordOnChange}
                               value={user.password}/>
                        <button className={""}
                                onClick={handleOnClick}>Войти
                        </button>
                    </form>
            }
        </>
    );
};

export default LoginForm;
