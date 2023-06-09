import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ACCENT_COLOR } from '../../styles/styles';

interface SectionHeadingProps {
  sectionHeadingText: string;
}

const Heading: FC<SectionHeadingProps> = ({ sectionHeadingText }) => {
  return (
    <Text
      color={'gray.300'}
      fontWeight="bold"
      fontSize={['2xl', '3xl', '4xl']}
      mx={0}
      my={['0', '2', '3', '4']}
      _after={{
        content: '""',
        display: 'inline-block',
        position: 'relative',
        top: '-.7rem',
        width: '30%',
        height: '1px',
        ml: '1rem',

        backgroundColor: 'gray.700',
      }}
    >
      {sectionHeadingText}
    </Text>
  );
};

export default Heading;
