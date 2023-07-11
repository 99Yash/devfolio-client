import { SignIn } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { BsArrowLeft, BsArrowRight, BsGrid1X2 } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GiSewingNeedle } from 'react-icons/gi';
import { SiMoleculer } from 'react-icons/si';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const Marketing = () => {
  const features = [
    {
      icon: SiMoleculer,
      name: 'Incredibly Versatile',
      description:
        'Effortlessly add a bio, an about section, previous work, and showcase your projects.',
    },
    {
      icon: BsGrid1X2,
      name: 'Fully Responsive',
      description: 'Exceptional viewing experience on all types of devices',
    },
    {
      icon: FiSettings,
      name: 'Developer Specific',
      description: 'Add your Tech Stack & your Social profiles',
    },
    {
      icon: GiSewingNeedle,
      name: 'No Strings attached',
      description: 'The ultimate solution. Completely free.',
    },
  ];
  const [showSignin, setShowSignin] = useState(false);
  return (
    <Fade direction="up" duration={300}>
      {!showSignin && (
        <div className={`${inter.className} `}>
          <nav className={`text-right flex justify-end mx-4 mt-2 `}>
            <button
              onClick={() => setShowSignin(true)}
              className=" flex text-gray-400 py-2 px-4 rounded-md "
            >
              Sign in
            </button>
          </nav>
          <div
            className={`${inter.className} h-screen flex flex-col justify-center items-center gap-4 `}
          >
            <div className="flex flex-col flex-wrap lg:px-2 px-6 text-center justify-center items-center gap-3">
              <h1 className={`text-5xl text-gray-300 font-semibold `}>
                Share your work, We&apos;ll do the rest.
              </h1>
              <p className={`text-md text-gray-400 `}>
                Showcase your skills and achievements &nbsp;Create a stunning
                online presence.
              </p>
            </div>
            <div className="flex gap-2 ">
              <button
                onClick={() => setShowSignin(true)}
                className="bg-gray-300 font-medium flex justify-center text-gray-900 py-2 px-6 rounded-md "
              >
                Get going &nbsp;
                <BsArrowRight className="self-center" />
              </button>
              <Link
                href={'https://github.com/99Yash/devfolio-client'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black flex text-gray-300 py-2 px-4 rounded-md "
              >
                Star on Github
              </Link>
            </div>
          </div>

          <div
            className={`${inter.className} max-h-screen flex flex-col flex-wrap justify-center items-center lg:text-left text-center gap-3 px-4 `}
          >
            <p
              className={`text-blue-400 text-lg font-medium md:self-start lg:text-left lg:self-center `}
            >
              Focus on what you love.
            </p>
            <h1
              className={`text-4xl tracking-wide font-semibold text-gray-300 `}
            >
              Catapult your Online Presence
            </h1>
            <hr className="w-40 mx-auto my-4 border-blue-600 " />
            <p
              className={`text-lg text-gray-400 max-w-xl lg:max-w-none hidden md:inline `}
            >
              Don&apos;t venture outside your expertise if it&apos;s not your
              passion.
            </p>
            <p className={`text-lg text-gray-400 max-w-xl `}>
              Show your skills as a backend or a junior developer in the best
              possible light. Devfolio is designed to create a stunning online
              presence with ease. Include links to your LinkedIn, Twitter, and
              GitHub profiles to connect seamlessly with potential employers and
              collaborators. Don&apos;t settle for a lackluster online presence.
            </p>
            <p className={`text-lg text-gray-400 max-w-xl `}>
              Elevate your game.
            </p>
            <dl className="grid grid-cols-1 mt-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="px-2 py-1 rounded group hover:bg-zinc-300 duration-500"
                >
                  <div className="flex items-center mb-1 space-x-2 ">
                    <feature.icon className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-950 duration-500" />
                    <h4 className="font-medium text-zinc-300 group-hover:text-zinc-950 duration-500">
                      {feature.name}
                    </h4>
                  </div>
                  <p className="text-sm text-left text-zinc-400 group-hover:text-zinc-950 duration-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <div
            className={`
          ${inter.className} h-screen flex flex-col justify-center items-center gap-4
            `}
          >
            <div className="flex flex-col flex-wrap lg:px-2 px-6 text-center justify-center items-center gap-3">
              <p
                className={`text-pink-400 text-lg font-medium lg:self-center `}
              >
                Cut the Clutter.
              </p>
              <h1
                className={`text-4xl tracking-wide font-semibold text-gray-300 `}
              >
                Take Control.
              </h1>
              <hr className="w-40 mx-auto my-2 border-pink-800 " />
              <p
                className={`text-lg text-gray-400 max-w-xl lg:max-w-none hidden md:inline `}
              >
                Keep your sites seen without costing a cent.
              </p>
            </div>
            <button
              onClick={() => setShowSignin(true)}
              className="bg-gray-300/90 font-medium hover:bg-gray-400 flex justify-center text-gray-950 py-2 px-6 rounded-md "
            >
              Click this button
              <BsArrowRight className="self-center" />
            </button>
          </div>
        </div>
      )}
      {/* //use a modal */}
      {showSignin && (
        <div className="h-screen flex flex-col justify-center items-center gap-4 ">
          <button
            onClick={() => setShowSignin(false)}
            className={`rounded-md ${inter.className} flex justify-center items-center border border-gray-800 text-gray-400 px-6 py-2 `}
          >
            <BsArrowLeft className="mr-2" />
            Go back
          </button>
          <SignIn
            appearance={{
              variables: {
                colorPrimary: '#000000',
              },
              elements: {
                rootBox: `bg-black`,
                formButtonPrimary: `bg-gray-200 text-gray-900 hover:bg-gray-300 ${inter.className} `,
                card: 'bg-gray-950',
                header: `bg-gray-900 bg-clip-text ${inter.className} `,
                headerTitle: `font-medium`,
                headerSubtitle: ``,
                socialButtonsBlockButtonText: `${inter.className} font-normal text-gray-300 `,
                formFieldInput: `bg-inherit`,
                formFieldLabel: `text-gray-300 font-normal `,
                footerActionLink: `text-sky-300 hover:text-sky-400 `,
              },
            }}
          />
        </div>
      )}
      <footer
        className={`pt-24 ${inter.className} `}
        aria-labelledby="footer-heading"
      >
        <div className="px-6 pb-8 mx-auto max-w-7xl lg:px-8">
          <div className="pt-8 mt-16 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
            <div className="flex space-x-6 md:order-2">
              <Link
                target="_blank"
                href="https://twitter.com/YashGouravKar1"
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href={'https://github.com/99Yash/devfolio-client'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">Github</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <p className="mt-8 text-xs text-gray-400 leading-5 md:order-1 md:mt-0">
              &copy; {new Date().getUTCFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Fade>
  );
};

export default Marketing;