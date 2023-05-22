import { sectionsData } from '@/data/defaultSectionData';
import { UserDoc } from '@/models/user.model';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import AboutModal from '../modals/AboutModal';
import ExpModal from '../modals/ExpModal';
import ProjectModal from '../modals/ProjectModal';
import TechStackModal from '../modals/TechStackModal';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import TechStack from './TechStack';

interface DefaultMainSectionProps {
  sectionTitle: string;
  userProfileData: Pick<
    UserDoc,
    'about' | 'techStack' | 'projects' | 'experiences'
  >;
}

const getDataBySectionTitle = (sectionTitle: string) => {
  return sectionsData.find((section) => section.sectionTitle === sectionTitle);
};

//todo add onClicks to buttons for respective modals
const DefaultMainSection: FC<DefaultMainSectionProps> = ({
  sectionTitle,
  userProfileData,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const MainSectionModal = () => {
    if (sectionTitle === 'Experiences')
      return <ExpModal isOpen={isOpen} onClose={onClose} />;
    if (sectionTitle === 'About')
      return <AboutModal isOpen={isOpen} onClose={onClose} />;
    if (sectionTitle === 'Tech Stack')
      return <TechStackModal isOpen={isOpen} onClose={onClose} />;
    if (sectionTitle === 'Projects') {
      return <ProjectModal isOpen={isOpen} onClose={onClose} />;
    } else {
      return <></>;
    }
  };

  const SectionContent = () => {
    if (
      sectionTitle === 'About' &&
      userProfileData.about?.length &&
      userProfileData.about?.length > 0
    ) {
      return <About about={userProfileData.about} />;
    } else if (
      sectionTitle === 'Tech Stack' &&
      userProfileData.techStack &&
      userProfileData.techStack?.length > 0
    ) {
      return <TechStack techStack={userProfileData.techStack} />;
    } else if (
      sectionTitle === 'Projects' &&
      userProfileData.projects &&
      userProfileData.projects.length > 0
    ) {
      return <Projects projects={userProfileData.projects} />;
    } else if (
      sectionTitle === 'Experiences' &&
      userProfileData.experiences &&
      userProfileData.experiences?.length > 0
    ) {
      return <Experiences experiences={userProfileData.experiences} />;
    } else {
      return (
        <>
          <VStack
            display={'flex'}
            gap={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Heading size={'sm'}>
              {getDataBySectionTitle(sectionTitle)?.sectionDescription.title}
            </Heading>
            <Text size={'sm'} color={'gray.500'}>
              {getDataBySectionTitle(sectionTitle)?.sectionDescription.body}
            </Text>
            <Button onClick={onOpen} variant={'outline'} color={'teal'}>
              {getDataBySectionTitle(sectionTitle)?.buttonText}
            </Button>
          </VStack>
          {isOpen && <MainSectionModal />}
        </>
      );
    }
  };

  return (
    <Flex flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading size={'md'}>{sectionTitle}</Heading>
        <Button onClick={onOpen}>
          {sectionTitle === 'About' ? <MdModeEdit /> : <IoMdAdd />}
        </Button>
      </HStack>
      <SectionContent />
      {isOpen && <MainSectionModal />}
    </Flex>
  );
};
export default DefaultMainSection;