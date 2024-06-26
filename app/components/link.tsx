import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps as RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';

export const Link = (
  props: Omit<RemixLinkProps, 'color'> & ChakraLinkProps
) => <ChakraLink as={RemixLink} {...props} />;
