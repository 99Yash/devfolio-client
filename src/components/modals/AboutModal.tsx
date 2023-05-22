import {
  useFetchUserAboutQuery,
  useUpdateAboutMutation,
} from '@/store/userApi';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import InputField from '../utils/InputField';

export type ModalsProps = Omit<ModalProps, 'children'>;

const AboutModal: FC<ModalsProps> = (props) => {
  const [updateAbout, { isLoading, isError, isSuccess }] =
    useUpdateAboutMutation();
  const { data, isFetching, error } = useFetchUserAboutQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Modal size={'xl'} isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ about: data?.about }}
            onSubmit={async (values) => {
              const { about } = values;
              if (about === data?.about) {
                props.onClose();
                return;
              }
              try {
                await updateAbout(about as string);
              } catch (err: any) {
                console.log(err);
              }
              props.onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  variant="unstyled"
                  istextarea={true}
                  autoComplete="off"
                  placeholder={data?.about ? data?.about : 'Add Bio'}
                  name={'about'}
                  label="About"
                  showLabel={false}
                />
                <Button
                  variant={'ghost'}
                  w={'full'}
                  mt={8}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;