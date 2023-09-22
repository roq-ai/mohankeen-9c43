import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createModeration } from 'apiSdk/moderations';
import { moderationValidationSchema } from 'validationSchema/moderations';
import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';
import { getReviews } from 'apiSdk/reviews';
import { getUsers } from 'apiSdk/users';
import { ModerationInterface } from 'interfaces/moderation';

function ModerationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ModerationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createModeration(values);
      resetForm();
      router.push('/moderations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ModerationInterface>({
    initialValues: {
      action: '',
      reason: '',
      review_id: (router.query.review_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: moderationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Moderations',
              link: '/moderations',
            },
            {
              label: 'Create Moderation',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Moderation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.action}
            label={'Action'}
            props={{
              name: 'action',
              placeholder: 'Action',
              value: formik.values?.action,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.reason}
            label={'Reason'}
            props={{
              name: 'reason',
              placeholder: 'Reason',
              value: formik.values?.reason,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ReviewInterface>
            formik={formik}
            name={'review_id'}
            label={'Select Review'}
            placeholder={'Select Review'}
            fetcher={getReviews}
            labelField={'title'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/moderations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'moderation',
    operation: AccessOperationEnum.CREATE,
  }),
)(ModerationCreatePage);
