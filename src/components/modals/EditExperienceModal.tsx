import { useAppDispatch } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { editExperience } from '@/store/user.slice';
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import DeleteExperienceModal from './deletion/DeleteExperienceModal';

const EditExperienceModal: FC<ModalsProps & { experience: ExperienceDoc }> = ({
  isOpen,
  onClose,
  experience,
}) => {
  const dispatch = useAppDispatch();
  const endDate =
    experience.present === false
      ? new Date(experience.endDate).toISOString().split('T')[0]
      : null;

  const startDate = new Date(experience.startDate).toISOString().split('T')[0];
  const [isPresent, setIsPresent] = useState<boolean>(
    experience.present || false
  );
  const [startingDate, setStartingDate] = useState(startDate);
  const [endingDate, setEndingDate] = useState(endDate);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  return (
    <Modal
      size={'3xl'}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="none"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Positions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              position: experience.position,
              companyName: experience.companyName,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.present ? null : experience.endDate,
              present: experience.present,
            }}
            onSubmit={async (values) => {
              if (Object.values(values).every((val) => val === '')) {
                onClose();
                return;
              }
              if (endDate === '' && !isPresent) return;
              try {
                const { data } = await axiosClient.put('/user/experience', {
                  experience: {
                    position: values.position,
                    companyName: values.companyName,
                    description: values.description,
                    startDate: startingDate ? startingDate : startDate,
                    endDate: isPresent ? 'present' : endingDate || endDate,
                    present: isPresent,
                  },
                });
                console.log(data);
                dispatch(
                  editExperience({
                    experience: data,
                  })
                );
              } catch (err: any) {
                console.error(err);
              }
              onClose();
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <VStack>
                  <InputField
                    label="position"
                    showLabel={'true'}
                    placeholder={experience.position}
                    autoComplete="off"
                    name="position"
                    type="text"
                  />
                  <InputField
                    label="Company"
                    showLabel={'true'}
                    placeholder={experience.companyName}
                    autoComplete="off"
                    name="companyName"
                    type="text"
                  />
                  <Flex justifyContent={'space-between'}>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      size={'md'}
                      value={startDate}
                      onChange={(e) => setStartingDate(e.target.value)}
                    />
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      placeholder="Select end date"
                      size={'md'}
                      value={endDate ? endDate : ''}
                      onChange={(e) => setEndingDate(e.target.value)}
                      isDisabled={isPresent}
                    />
                  </Flex>
                  <Flex my={2} alignItems="baseline">
                    <Checkbox
                      checked={isPresent}
                      value={!!isPresent ? 'true' : 'false'}
                      onChange={(e) => setIsPresent(e.target.checked)}
                      mr={2}
                      colorScheme="teal"
                    >
                      Present
                    </Checkbox>
                  </Flex>
                  <Flex flexDir={'column'} w={'full'}>
                    <InputField
                      label="Description"
                      showLabel={'true'}
                      type="text"
                      placeholder={experience.description}
                      name="description"
                    />
                  </Flex>
                  <ModalFooter gap={2}>
                    <Button
                      _focus={{
                        boxShadow: 'none',
                      }}
                      onClick={onOpenDeleteModal}
                      variant={'outline'}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                    <Button variant={'outline'} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme={'teal'}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>

        {isDeleteModalOpen && (
          <DeleteExperienceModal
            isOpen={isDeleteModalOpen}
            onClose={onCloseDeleteModal}
            experienceId={experience._id}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditExperienceModal;