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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getAnimeById, updateAnimeById } from 'apiSdk/anime';
import { animeValidationSchema } from 'validationSchema/anime';
import { AnimeInterface } from 'interfaces/anime';

function AnimeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<AnimeInterface>(
    () => (id ? `/anime/${id}` : null),
    () => getAnimeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnimeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnimeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/anime');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<AnimeInterface>({
    initialValues: data,
    validationSchema: animeValidationSchema,
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
              label: 'Anime',
              link: '/anime',
            },
            {
              label: 'Update Anime',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Anime
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.genre}
            label={'Genre'}
            props={{
              name: 'genre',
              placeholder: 'Genre',
              value: formik.values?.genre,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="release_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Release Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.release_date ? new Date(formik.values?.release_date) : null}
              onChange={(value: Date) => formik.setFieldValue('release_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Episodes"
            formControlProps={{
              id: 'episodes',
              isInvalid: !!formik.errors?.episodes,
            }}
            name="episodes"
            error={formik.errors?.episodes}
            value={formik.values?.episodes}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('episodes', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Duration"
            formControlProps={{
              id: 'duration',
              isInvalid: !!formik.errors?.duration,
            }}
            name="duration"
            error={formik.errors?.duration}
            value={formik.values?.duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
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
              onClick={() => router.push('/anime')}
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
    entity: 'anime',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AnimeEditPage);
