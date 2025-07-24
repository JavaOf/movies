import * as yup from 'yup';

const signInSchema = yup.object().shape({
    username: yup
        .string()
        .required('Это поле обязательное')
        .trim()
        .strict()
        .min(3, 'Необходимо минимум 3 символа')
        .max(30, 'Имя пользователя не должно превышать 30 символов')
        .matches(/^[a-zA-Z0-9_]+$/, 'Имя пользователя может содержать только буквы, цифры и нижнее подчёркивание'),
    email: yup
        .string()
        .trim()
        .strict()
        .required('Обязательное поле')
        .email('Не корректный email')
        .max(50, 'Email не должен превышать 50 символов')
        .lowercase()
    ,
    password: yup
        .string()
        .trim()
        .strict()
        .required('Это поле обязательно')
        .min(6, 'Необходимо минимум 6 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d).+$/, 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру')
        .max(100, 'Пароль не должен превышать 100 символов'),
    password_confirm: yup
        .string()
        .trim()
        .strict()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        .required('Обязательное поле'),
});

export default signInSchema;