import * as yup from 'yup';
import i18n from 'i18next';

const t = i18n.t.bind(i18n);

const signInSchema = yup.object().shape({
    username: yup
        .string()
        .required(t('error_required'))
        .trim()
        .strict()
        .min(3, t('error_min_chars', { count: 3 }))
        .max(30, t('error_max_chars', { count: 30 }))
        .matches(/^[a-zA-Z0-9_]+$/, t('error_username_format')),
    email: yup
        .string()
        .trim()
        .strict()
        .required(t('error_required'))
        .email(t('error_invalid_email'))
        .max(50, t('error_max_chars', { count: 50 }))
        .lowercase(),
    password: yup
        .string()
        .trim()
        .strict()
        .required(t('error_required'))
        .min(6, t('error_min_chars', { count: 6 }))
        .matches(/^(?=.*[A-Z])(?=.*\d).+$/, t('error_password_format'))
        .max(100, t('error_max_chars', { count: 100 })),
    password_confirm: yup
        .string()
        .trim()
        .strict()
        .oneOf([yup.ref('password'), null], t('error_passwords_do_not_match'))
        .required(t('error_required')),
});

export default signInSchema;
