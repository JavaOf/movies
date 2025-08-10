import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .strict()
        .required('Обязательное поле')
        .email('Некорректный email')
        .max(50, 'Email не должен превышать 50 символов')
        .lowercase(),
    password: yup
        .string()
        .trim()
        .strict()
        .required('Это поле обязательно')
        .min(6, 'Необходимо минимум 6 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d).+$/, 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру')
        .max(100, 'Пароль не должен превышать 100 символов'),
});

export default loginSchema;
