import * as yup from 'yup';
import i18n from 'i18next';

const t = i18n.t.bind(i18n);

const loginSchema = yup.object().shape({
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
});

export default loginSchema;
