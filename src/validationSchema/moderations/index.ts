import * as yup from 'yup';

export const moderationValidationSchema = yup.object().shape({
  action: yup.string().required(),
  reason: yup.string().nullable(),
  review_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
